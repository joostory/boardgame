'use client';

import React from 'react';

type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

interface BoardProps {
  guesses: string[][];
  guessResults: LetterStatus[][];
  currentAttempt: number;
  currentGuess: string[];
  shakeRow: number | null;
  flipRow: number | null;
}

export default function Board({
  guesses,
  guessResults,
  currentAttempt,
  currentGuess,
  shakeRow,
  flipRow,
}: BoardProps) {
  return (
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
  );
}
