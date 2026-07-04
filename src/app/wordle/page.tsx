'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getRandomWord, disassembleHangul, assembleHangul } from './words';
import { AlertCircle } from 'lucide-react';

import Header from '@/components/wordle/Header';
import Board from '@/components/wordle/Board';
import Keyboard from '@/components/wordle/Keyboard';
import GuideModal from '@/components/wordle/GuideModal';
import ResultModal from '@/components/wordle/ResultModal';

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
    queueMicrotask(() => {
      startNewGame();
      // 최초 실행 시 안내창 띄우기
      setShowGuide(true);
    });
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
      <Header
        onShowGuide={() => setShowGuide(true)}
        onStartNewGame={startNewGame}
      />

      {/* 게임 안내 메시지 팝업 */}
      {message && (
        <div className="fixed top-20 z-50 bg-neutral-900 border border-neutral-800 text-neutral-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 max-w-sm text-sm font-medium animate-bounce">
          <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* 게임 판 (Grid) */}
      <Board
        guesses={guesses}
        guessResults={guessResults}
        currentAttempt={currentAttempt}
        currentGuess={currentGuess}
        shakeRow={shakeRow}
        flipRow={flipRow}
      />

      {/* 가상 키보드 */}
      <Keyboard
        onVirtualKey={handleVirtualKey}
        getKeyStatus={getKeyStatus}
        currentGuessLength={currentGuess.length}
      />

      {/* 게임 규칙 모달 */}
      {showGuide && (
        <GuideModal
          onClose={() => {
            setShowGuide(false);
            inputRef.current?.focus();
          }}
        />
      )}

      {/* 게임 결과 모달 (화면 중앙) */}
      {showResult && (
        <ResultModal
          gameStatus={gameStatus}
          currentAttempt={currentAttempt}
          targetWord={targetWord}
          targetJasos={targetJasos}
          onStartNewGame={startNewGame}
          onClose={() => setShowResult(false)}
        />
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
