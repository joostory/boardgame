// pages/ladder-game.tsx
import { useState, useEffect, useRef } from 'react';

interface HorizontalLine {
  startX: number;
  endX: number;
  y: number;
}

const LadderCanvas = ({ items, horizontalLines }: { items: string[]; horizontalLines: HorizontalLine[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const itemCount = items.length;
        const ladderWidth = canvas.width / (itemCount + 1);

        // 수직선 그리기
        for (let i = 1; i <= itemCount; i++) {
          ctx.beginPath();
          ctx.moveTo(i * ladderWidth, 0);
          ctx.lineTo(i * ladderWidth, canvas.height);
          ctx.stroke();
        }

        // 수평선 그리기
        horizontalLines.forEach((line) => {
          ctx.beginPath();
          ctx.moveTo((line.startX + 1) * ladderWidth, line.y);
          ctx.lineTo((line.endX + 1) * ladderWidth, line.y);
          ctx.stroke();
        });
      }
    }
  }, [items, horizontalLines]);

  return <canvas ref={canvasRef} width={800} height={600} className="border" />;
};

const generateHorizontalLines = (itemCount: number, canvasHeight: number): HorizontalLine[] => {
  const lines: HorizontalLine[] = [];
  const lineCount = Math.floor(Math.random() * 10) + 5; // 5~14개의 수평선 생성
  for (let i = 0; i < lineCount; i++) {
    const startX = Math.floor(Math.random() * (itemCount - 1));
    const endX = startX + 1;
    const y = Math.floor(Math.random() * canvasHeight);
    lines.push({ startX, endX, y });
  }
  return lines;
};

const findConnectedItem = (startIndex: number, items: string[], horizontalLines: HorizontalLine[]): string => {
  let currentIndex = startIndex;
  const sortedLines = [...horizontalLines].sort((a, b) => a.y - b.y); // y축 기준 정렬
  sortedLines.forEach((line) => {
    if (line.startX === currentIndex) {
      currentIndex = line.endX;
    } else if (line.endX === currentIndex) {
      currentIndex = line.startX;
    }
  });
  return items[currentIndex];
};

const LadderGame = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [horizontalLines, setHorizontalLines] = useState<HorizontalLine[]>([]);

  // localStorage에서 항목 로드
  useEffect(() => {
    const storedItems = localStorage.getItem('ladderItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // 항목 변경 시 수평선 생성
  useEffect(() => {
    if (items.length > 0) {
      const lines = generateHorizontalLines(items.length, 600);
      setHorizontalLines(lines);
    } else {
      setHorizontalLines([]);
    }
  }, [items]);

  const handleAddItem = () => {
    if (inputValue.trim() === '') return;
    const newItems = [...items, inputValue];
    setItems(newItems);
    localStorage.setItem('ladderItems', JSON.stringify(newItems));
    setInputValue('');
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem('ladderItems', JSON.stringify(newItems));
  };

  const handleNumberClick = (index: number) => {
    const connectedItem = findConnectedItem(index, items, horizontalLines);
    alert(`선택한 번호 ${index + 1}은(는) "${connectedItem}"와(과) 연결되었습니다!`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">사다리타기 게임</h1>

      {/* 항목 입력 */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="항목을 입력하세요"
        />
        <button onClick={handleAddItem} className="bg-blue-500 text-white p-2 rounded">
          추가
        </button>
      </div>

      {/* 입력된 항목 목록 */}
      <ul className="mb-4">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{item}</span>
            <button
              onClick={() => handleDeleteItem(index)}
              className="bg-red-500 text-white p-1 rounded"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      {/* 클릭 가능한 번호 */}
      {items.length > 0 && (
        <div className="flex justify-around mb-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNumberClick(index)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* 사다리타기 캔버스 */}
      {items.length > 0 && <LadderCanvas items={items} horizontalLines={horizontalLines} />}

      {/* 하단 항목 */}
      {items.length > 0 && (
        <div className="flex justify-around mt-4">
          {items.map((item, index) => (
            <div key={index} className="text-center w-20">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LadderGame;
