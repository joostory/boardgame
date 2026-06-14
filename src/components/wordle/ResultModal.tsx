'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ResultModalProps {
  gameStatus: 'won' | 'lost' | 'playing';
  currentAttempt: number;
  targetWord: string;
  targetJasos: string[];
  onStartNewGame: () => void;
  onClose: () => void;
}

export default function ResultModal({
  gameStatus,
  currentAttempt,
  targetWord,
  targetJasos,
  onStartNewGame,
  onClose,
}: ResultModalProps) {
  return (
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
            onClick={onStartNewGame}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold rounded-xl hover:from-emerald-400 hover:to-teal-400 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/10"
          >
            <RefreshCw className="w-5 h-5 animate-spin-slow" />
            새로운 게임 시작하기
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 font-medium rounded-xl text-xs transition-colors cursor-pointer"
          >
            결과 기록 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
