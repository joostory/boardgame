'use client';

import React from 'react';
import Link from 'next/link';
import { Home, HelpCircle, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onShowGuide: () => void;
  onStartNewGame: () => void;
}

export default function Header({ onShowGuide, onStartNewGame }: HeaderProps) {
  return (
    <header className="w-full max-w-md flex items-center justify-between border-b border-neutral-800 pb-3 pt-2">
      <Link href="/" className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
        <Home className="w-6 h-6 text-neutral-400" />
      </Link>
      <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center gap-1.5">
        단어 자소 추리 <span className="text-xs px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded-full">5자소</span>
      </h1>
      <div className="flex gap-1">
        <button
          onClick={onShowGuide}
          className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
          title="게임 가이드"
        >
          <HelpCircle className="w-6 h-6 text-neutral-400" />
        </button>
        <button
          onClick={onStartNewGame}
          className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
          title="새 게임 시작"
        >
          <RefreshCw className="w-6 h-6 text-neutral-400" />
        </button>
      </div>
    </header>
  );
}
