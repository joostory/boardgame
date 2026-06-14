'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  getRandomWord, 
  disassembleHangul, 
  assembleHangul, 
  CHO_SUNG, 
  JUNG_SUNG, 
  JONG_SUNG 
} from './words';
import { HelpCircle, RefreshCw, Home, Check, AlertCircle } from 'lucide-react';

type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export default function WordleGame() {
  // 게임 핵심 상태
  const [targetWord, setTargetWord] = useState('');
  const [targetJasos, setTargetJasos] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[][]>(Array(5).fill(null).map(() => []));
  const [guessResults, setGuessResults] = useState<LetterStatus[][]>(
    Array(5).fill(null).map(() => Array(5).fill('empty'))
  );
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  // UI 상태
  const [isMobile, setIsMobile] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shakeRow, setShakeRow] = useState<number | null>(null);
  const [flipRow, setFlipRow] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // 모바일 터치 디바이스 체크
  useEffect(() => {
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch);
    };
    checkMobile();
  }, []);

  // 게임 시작 시 단어 선정
  const startNewGame = () => {
    const { word, jasos } = getRandomWord();
    setTargetWord(word);
    setTargetJasos(jasos);
    setGuesses(Array(5).fill(null).map(() => []));
    setGuessResults(Array(5).fill(null).map(() => Array(5).fill('empty')));
    setCurrentAttempt(0);
    setCurrentGuess([]);
    setInputValue('');
    setGameStatus('playing');
    setMessage(null);
    setShowResult(false);
    setFlipRow(null);
    
    // 약간의 딜레이 후 인풋 포커스 (모바일 제외)
    setTimeout(() => {
      if (inputRef.current && !isMobile) {
        inputRef.current.focus();
      }
    }, 50);
  };

  useEffect(() => {
    startNewGame();
    // 최초 실행 시 안내창 띄우기
    setShowGuide(true);
  }, [isMobile]); // isMobile 값 설정 후 새 게임 처리 재확인

  // 화면 클릭 시 항상 인풋 포커스 유지 (모바일 제외)
  const keepFocus = () => {
    if (gameStatus === 'playing' && !showGuide && !showResult && !isMobile) {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('click', keepFocus);
    return () => {
      document.removeEventListener('click', keepFocus);
    };
  }, [gameStatus, showGuide, showResult, isMobile]);

  // 실제 물리 키보드 입력 동기화
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameStatus !== 'playing') return;

    const val = e.target.value;
    const jasos = disassembleHangul(val);

    if (jasos.length <= 5) {
      setInputValue(val);
      setCurrentGuess(jasos);
    } else {
      // 5글자 자소 제한
      const sliced = jasos.slice(0, 5);
      const reassembled = assembleHangul(sliced);
      setInputValue(reassembled);
      setCurrentGuess(sliced);
    }
  };

  // 키 다운 (Enter, Backspace 등 수동 처리)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (gameStatus !== 'playing') return;

    if (e.key === 'Enter') {
      e.preventDefault();
      submitGuess();
    }
  };

  // 가상 키보드 입력 처리
  const handleVirtualKey = (key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      submitGuess();
      return;
    }

    if (key === 'BACK') {
      if (currentGuess.length > 0) {
        const nextGuess = currentGuess.slice(0, -1);
        const assembled = assembleHangul(nextGuess);
        setInputValue(assembled);
        setCurrentGuess(nextGuess);
      }
      if (!isMobile) inputRef.current?.focus();
      return;
    }

    // 일반 자소 추가 (5글자 미만일 때만)
    if (currentGuess.length < 5) {
      const nextGuess = [...currentGuess, key];
      const assembled = assembleHangul(nextGuess);
      setInputValue(assembled);
      setCurrentGuess(nextGuess);
    }
    if (!isMobile) inputRef.current?.focus();
  };

  // 단어 제출 로직
  const submitGuess = () => {
    if (currentGuess.length < 5) {
      // 5개 미만 입력 시 흔들기 애니메이션
      setShakeRow(currentAttempt);
      showTemporaryMessage('자소가 부족합니다 (5칸 필요)');
      setTimeout(() => setShakeRow(null), 500);
      return;
    }

    // 결과 판정 (Wordle 알고리즘 적용)
    const result: LetterStatus[] = Array(5).fill('absent');
    const targetTaken = Array(5).fill(false);
    const guessTaken = Array(5).fill(false);

    // 1단계: 초록색(correct) 판정
    for (let i = 0; i < 5; i++) {
      if (currentGuess[i] === targetJasos[i]) {
        result[i] = 'correct';
        targetTaken[i] = true;
        guessTaken[i] = true;
      }
    }

    // 2단계: 노란색(present) 판정
    for (let i = 0; i < 5; i++) {
      if (guessTaken[i]) continue;
      for (let j = 0; j < 5; j++) {
        if (!targetTaken[j] && currentGuess[i] === targetJasos[j]) {
          result[i] = 'present';
          targetTaken[j] = true;
          break;
        }
      }
    }

    // 히스토리 업데이트 및 플립 애니메이션 시작
    setFlipRow(currentAttempt);
    
    // 상태 업데이트 애니메이션 타이밍 조절
    const nextGuesses = [...guesses];
    nextGuesses[currentAttempt] = currentGuess;
    
    const nextResults = [...guessResults];
    nextResults[currentAttempt] = result;

    setGuesses(nextGuesses);
    setGuessResults(nextResults);

    // 성공 여부 판정
    const isCorrect = result.every(status => status === 'correct');

    setTimeout(() => {
      setFlipRow(null);
      
      if (isCorrect) {
        setGameStatus('won');
        setShowResult(true);
      } else if (currentAttempt >= 4) {
        setGameStatus('lost');
        setShowResult(true);
      } else {
        // 다음 턴으로
        setCurrentAttempt(prev => prev + 1);
        setCurrentGuess([]);
        setInputValue('');
      }
    }, 1000); // 플립 애니메이션 1초 대기
  };

  // 임시 메시지 노출 (게임 도중 경고용)
  const showTemporaryMessage = (msg: string, duration = 2000) => {
    setMessage(msg);
    if (duration > 0) {
      setTimeout(() => {
        setMessage(prev => prev === msg ? null : prev);
      }, duration);
    }
  };

  // 키보드 자판에서 각 자모의 가장 높은 상태 구하기 (가상 키보드 힌트용)
  const getKeyStatus = (key: string): LetterStatus => {
    let bestStatus: LetterStatus = 'empty';

    for (let i = 0; i < currentAttempt; i++) {
      const row = guesses[i];
      const result = guessResults[i];
      for (let j = 0; j < 5; j++) {
        if (row[j] === key) {
          const status = result[j];
          if (status === 'correct') return 'correct'; // 초록색이 최고 우선순위
          if (status === 'present') {
            bestStatus = 'present';
          }
          if (status === 'absent' && bestStatus === 'empty') {
            bestStatus = 'absent';
          }
        }
      }
    }
    return bestStatus;
  };

  // 한글 가상 키보드 레이아웃 (이중 자모가 없는 기본 단일 자모 키 배열)
  const keyboardRows = [
    ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ'],
    ['ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ'],
    ['ENTER', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'BACK']
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-between p-4 font-sans select-none">
      {/* 투명 한글 입력 필드 (IME 완벽 연동용, 모바일은 가상키보드 팝업 방지) */}
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={gameStatus !== 'playing'}
        autoFocus={!isMobile}
        inputMode={isMobile ? "none" : "text"}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* 헤더 */}
      <header className="w-full max-w-md flex items-center justify-between border-b border-neutral-800 pb-3 pt-2">
        <Link href="/" className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
          <Home className="w-6 h-6 text-neutral-400" />
        </Link>
        <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center gap-1.5">
          단어 자소 추리 <span className="text-xs px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded-full">5자소</span>
        </h1>
        <div className="flex gap-1">
          <button 
            onClick={() => setShowGuide(true)} 
            className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
            title="게임 가이드"
          >
            <HelpCircle className="w-6 h-6 text-neutral-400" />
          </button>
          <button 
            onClick={startNewGame} 
            className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
            title="새 게임 시작"
          >
            <RefreshCw className="w-6 h-6 text-neutral-400" />
          </button>
        </div>
      </header>

      {/* 게임 안내 메시지 팝업 */}
      {message && (
        <div className="fixed top-20 z-50 bg-neutral-900 border border-neutral-800 text-neutral-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 max-w-sm text-sm font-medium animate-bounce">
          <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* 게임 판 (Grid) */}
      <div className="my-auto py-4 w-full max-w-[330px] flex flex-col gap-2">
        {Array(5).fill(null).map((_, rowIndex) => {
          const isCurrentRow = rowIndex === currentAttempt;
          const isSubmitted = rowIndex < currentAttempt;
          
          // 현재 행은 입력 상태 실시간 반영, 이미 제출된 행은 저장된 추측 값, 그 외엔 빈 값
          let rowJasos = Array(5).fill('');
          if (isCurrentRow) {
            rowJasos = Array(5).fill('').map((_, idx) => currentGuess[idx] || '');
          } else if (isSubmitted) {
            rowJasos = guesses[rowIndex];
          }

          const isShaking = shakeRow === rowIndex;
          const isFlipping = flipRow === rowIndex;

          return (
            <div 
              key={rowIndex} 
              className={`grid grid-cols-5 gap-2 ${isShaking ? 'animate-shake' : ''}`}
              style={{
                animation: isShaking ? 'shake 0.5s ease-in-out' : undefined
              }}
            >
              {rowJasos.map((jaso, colIndex) => {
                const status = isSubmitted ? guessResults[rowIndex][colIndex] : 'empty';
                
                // 타일 색상 클래스
                let borderBgClass = 'border-neutral-800 bg-neutral-900/50 text-neutral-100';
                if (status === 'correct') {
                  borderBgClass = 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]';
                } else if (status === 'present') {
                  borderBgClass = 'bg-amber-600 border-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.3)]';
                } else if (status === 'absent') {
                  borderBgClass = 'bg-neutral-800 border-neutral-700 text-neutral-500';
                } else if (jaso) {
                  borderBgClass = 'border-neutral-600 bg-neutral-900 text-neutral-100 scale-105 transition-transform duration-100';
                }

                // 플립 애니메이션 딜레이 주기
                const delay = colIndex * 150;

                return (
                  <div
                    key={colIndex}
                    className={`w-full aspect-square rounded-xl flex items-center justify-center text-2xl font-bold border-2 transition-all duration-300 ${borderBgClass}`}
                    style={{
                      transform: isFlipping ? 'rotateX(90deg)' : 'none',
                      transitionDelay: isFlipping ? `${delay}ms` : '0ms',
                      animation: isFlipping ? `flip 0.6s ease forward ${delay}ms` : undefined
                    }}
                  >
                    {jaso}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* 가상 키보드 */}
      <div className="w-full max-w-md flex flex-col gap-1.5 pb-4">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 w-full">
            {row.map((key) => {
              const status = getKeyStatus(key);
              
              let keyBg = 'bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-neutral-100';
              if (status === 'correct') {
                keyBg = 'bg-emerald-600 text-white font-semibold';
              } else if (status === 'present') {
                keyBg = 'bg-amber-600 text-white font-semibold';
              } else if (status === 'absent') {
                keyBg = 'bg-neutral-900 text-neutral-600 border border-neutral-800';
              }

              // 특수 버튼 너비 조절
              const isSpecial = key === 'ENTER' || key === 'BACK';
              const widthClass = isSpecial ? 'px-3 text-xs flex-1' : 'w-9';

              return (
                <button
                  key={key}
                  onClick={() => handleVirtualKey(key)}
                  className={`h-12 ${widthClass} rounded-lg flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer select-none active:scale-95 duration-100 ${keyBg}`}
                >
                  {key === 'BACK' ? '지우기' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* 게임 규칙 모달 */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 max-w-sm w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                게임 방법 안내
              </h2>
            </div>
            
            <div className="text-sm text-neutral-300 flex flex-col gap-3 leading-relaxed">
              <p>
                <strong>5개의 한글 자소(자음/모음)</strong>로 구성된 비밀 단어를 <strong>5번의 기회</strong> 내에 추리하는 게임입니다.
              </p>
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex flex-col gap-1 text-xs">
                <div>• <strong>바람</strong>: [ㅂ] [ㅏ] [ㄹ] [ㅏ] [ㅁ] (5자소)</div>
                <div>• <strong>구름</strong>: [ㄱ] [ㅜ] [ㄹ] [ㅡ] [ㅁ] (5자소)</div>
                <div>• <strong>하늘</strong>: [ㅎ] [ㅏ] [ㄴ] [ㅡ] [ㄹ] (5자소)</div>
              </div>
              <p>
                실제 키보드로 바로 한글을 타이핑하거나, 화면의 자모 키보드를 눌러 입력할 수 있습니다.
              </p>
              
              <hr className="border-neutral-800" />
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">ㅂ</span>
                  <span><strong>초록색</strong>: 자소 종류와 자리가 정확히 일치</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-white text-xs">ㅏ</span>
                  <span><strong>노란색</strong>: 단어에 포함되나 자리가 다름</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-neutral-500 text-xs">ㄹ</span>
                  <span><strong>회색</strong>: 단어에 포함되지 않는 자소</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowGuide(false);
                inputRef.current?.focus();
              }}
              className="mt-2 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              게임 시작하기
            </button>
          </div>
        </div>
      )}

      {/* 게임 결과 모달 (화면 중앙) */}
      {showResult && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 max-w-sm w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-5 text-center animate-scaleUp">
            <div>
              {gameStatus === 'won' ? (
                <div>
                  <div className="text-5xl mb-2">🎉</div>
                  <h2 className="text-xl font-bold text-emerald-400">성공적으로 맞췄습니다!</h2>
                  <p className="text-xs text-neutral-400 mt-1">{currentAttempt + 1}번째 시도 만에 정답을 알아냈습니다.</p>
                </div>
              ) : (
                <div>
                  <div className="text-5xl mb-2">😢</div>
                  <h2 className="text-xl font-bold text-rose-400">아쉽게 실패했습니다!</h2>
                  <p className="text-xs text-neutral-400 mt-1">5번의 기회를 모두 사용하셨습니다.</p>
                </div>
              )}
            </div>

            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col gap-2">
              <span className="text-xs text-neutral-400">정답 단어</span>
              <span className="text-4xl font-extrabold text-emerald-400 tracking-widest font-mono">
                {targetWord}
              </span>
              <span className="text-xs text-neutral-500 tracking-wider mt-1">
                {targetJasos.join(' ')}
              </span>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={startNewGame}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold rounded-xl hover:from-emerald-400 hover:to-teal-400 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/10"
              >
                <RefreshCw className="w-5 h-5 animate-spin-slow" />
                새로운 게임 시작하기
              </button>
              
              <button
                onClick={() => setShowResult(false)}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 font-medium rounded-xl text-xs transition-colors cursor-pointer"
              >
                결과 기록 닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 스타일시트 (커스텀 쉐이크 & 플립 애니메이션 정의) */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-6px); }
          30%, 60%, 90% { transform: translateX(6px); }
        }
        @keyframes flip {
          0% { transform: rotateX(0deg); }
          45% { transform: rotateX(90deg); }
          55% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleUp {
          animation: scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </main>
  );
}
