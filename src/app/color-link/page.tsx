'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, RotateCcw, Award, Play, CheckCircle2, Trophy, HelpCircle, Undo2, AlertTriangle } from 'lucide-react';
import { LEVELS, Level, Point, Dot } from './levels';
import GameBoard from './GameBoard';

export default function ColorLinkGame() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const currentLevel = LEVELS[currentLevelIdx];
  const { dotsCount, dots, id: levelId, difficulty } = currentLevel;

  // 게임 진행 상태
  const [paths, setPaths] = useState<Record<string, Point[]>>({});
  const [completedColors, setCompletedColors] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Undo(되돌리기)를 위한 상태 이력 스택
  const [history, setHistory] = useState<{ paths: Record<string, Point[]>; completed: string[] }[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 새로운 레벨 선택 시 초기화
  useEffect(() => {
    resetGame(false);
    // 최초 실행 시 안내 가이드 띄움 (1번 레벨일 때만)
    if (currentLevelIdx === 0) {
      setShowGuideModal(true);
    }
  }, [currentLevelIdx]);

  // 타이머 작동 로직
  useEffect(() => {
    if (isTimerActive && gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, gameState]);

  // 첫 움직임 시 타이머 작동 시작
  const handleMove = () => {
    // 움직이기 직전 상태를 히스토리에 기록 (Undo 용)
    setHistory((prev) => [...prev, { paths: { ...paths }, completed: [...completedColors] }]);
    setMoves((prev) => prev + 1);
    if (!isTimerActive) {
      setIsTimerActive(true);
    }
  };

  // 실행 취소 (Undo)
  const handleUndo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setPaths(previousState.paths);
    setCompletedColors(previousState.completed);
    setHistory((prev) => prev.slice(0, -1));
  };

  // 게임 초기화
  const resetGame = (userTriggered = true) => {
    setPaths({});
    setCompletedColors([]);
    setGameState('playing');
    if (userTriggered) {
      setMoves((prev) => prev + 1); // 리셋도 1회 움직임으로 침
    } else {
      setMoves(0);
      setTime(0);
      setIsTimerActive(false);
    }
    setHistory([]);
  };

  // 선 충돌 시 즉시 탈락(Game Over) 처리
  const handleCrash = () => {
    setIsTimerActive(false);
    setGameState('lost');
  };

  // 승리 조건 체크 (모든 색상의 점들이 연결되었는지)
  useEffect(() => {
    const allConnected = completedColors.length === dots.length && dots.length > 0;

    if (allConnected && gameState === 'playing') {
      setIsTimerActive(false);
      // 축하 이펙트/모달 띄우기
      setTimeout(() => {
        setGameState('won');
      }, 300);
    }
  }, [completedColors, dots.length, gameState]);

  // 다음 레벨로 이동
  const handleNextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx((prev) => prev + 1);
    } else {
      // 마지막 레벨 클리어 시 알림
      alert('모든 레벨을 클리어하셨습니다! 축하합니다!');
      setCurrentLevelIdx(0);
    }
  };

  // 시간 포맷 변환 (초 -> 분:초)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col items-center justify-between pb-8">
      {/* 1. 네비게이션 헤더 */}
      <header className="w-full max-w-lg px-4 pt-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>목록</span>
        </Link>
        <h1 className="text-xl font-bold tracking-tight text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          색상 선 연결 퍼즐
        </h1>
        <button
          onClick={() => setShowGuideModal(true)}
          className="text-zinc-400 hover:text-zinc-100 transition-colors p-1"
          aria-label="게임 도움말"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </header>

      {/* 2. 레벨 정보 및 선택 패널 */}
      <div className="w-full max-w-lg px-4 mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between bg-zinc-800/50 backdrop-blur-md rounded-xl p-3 border border-zinc-700/30">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
              Level {levelId}
            </span>
            <span className="text-lg font-bold text-zinc-200">
              {dotsCount}쌍 연결 (자유)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold shadow-xs ${
                difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentLevelIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentLevelIdx === 0}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-xs font-semibold transition-all border border-zinc-700/50"
            >
              이전
            </button>
            <button
              onClick={() => setCurrentLevelIdx((prev) => Math.min(LEVELS.length - 1, prev + 1))}
              disabled={currentLevelIdx === LEVELS.length - 1}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-xs font-semibold transition-all border border-zinc-700/50"
            >
              다음
            </button>
          </div>
        </div>

        {/* 3. 인게임 지표 패널 */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-zinc-800/40 rounded-xl p-3 border border-zinc-800">
            <div className="text-xs text-zinc-500 font-medium mb-1">진행 시간</div>
            <div className="text-lg font-mono font-bold text-zinc-200">
              {formatTime(time)}
            </div>
          </div>
          <div className="bg-zinc-800/40 rounded-xl p-3 border border-zinc-800">
            <div className="text-xs text-zinc-500 font-medium mb-1">이동 횟수</div>
            <div className="text-lg font-bold text-zinc-200">{moves}</div>
          </div>
          <div className="bg-zinc-850 rounded-xl p-3 border border-zinc-800">
            <div className="text-xs text-zinc-500 font-medium mb-1">연결 성공</div>
            <div className="text-lg font-bold text-zinc-200">
              {completedColors.length} / {dots.length}
            </div>
          </div>
        </div>

        {/* 연결 진행률 상태바 */}
        <div className="w-full bg-zinc-850 h-2 rounded-full overflow-hidden border border-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${(completedColors.length / dots.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 4. 게임 보드 영역 */}
      <div className="my-auto w-full max-w-lg px-4 flex justify-center py-6">
        <GameBoard
          level={currentLevel}
          paths={paths}
          setPaths={setPaths}
          completedColors={completedColors}
          setCompletedColors={setCompletedColors}
          onMove={handleMove}
          onCrash={handleCrash}
        />
      </div>

      {/* 5. 하단 제어판 */}
      <div className="w-full max-w-lg px-4 flex justify-between gap-4">
        <button
          onClick={handleUndo}
          disabled={history.length === 0}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 disabled:opacity-40 disabled:hover:bg-zinc-800 text-sm font-semibold transition-all border border-zinc-700/50 shadow-md"
        >
          <Undo2 className="w-4 h-4" />
          <span>실행 취소 (Undo)</span>
        </button>
        
        <button
          onClick={() => resetGame(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-sm font-semibold transition-all border border-zinc-700/50 shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          <span>재시작 (Reset)</span>
        </button>
      </div>

      {/* 6. 클리어 성공 모달 */}
      {gameState === 'won' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-zinc-850 border border-zinc-700/50 rounded-2xl p-6 w-full max-w-md text-center shadow-2xl animate-scale-up">
            <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-400">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>
            
            <h2 className="text-2xl font-bold text-zinc-100 mb-1">Level {levelId} 클리어!</h2>
            <p className="text-sm text-zinc-400 mb-6">모든 색상의 점들을 겹치지 않게 연결했습니다.</p>

            <div className="grid grid-cols-2 gap-3 mb-6 bg-zinc-900/60 p-4 rounded-xl border border-zinc-850">
              <div>
                <span className="block text-xs text-zinc-500 mb-0.5">걸린 시간</span>
                <span className="text-lg font-mono font-bold text-zinc-200">{formatTime(time)}</span>
              </div>
              <div>
                <span className="block text-xs text-zinc-500 mb-0.5">이동 횟수</span>
                <span className="text-lg font-bold text-zinc-200">{moves}회</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => resetGame(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-sm font-semibold transition-all border border-zinc-700/50"
              >
                다시 하기
              </button>
              <button
                onClick={handleNextLevel}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-sm font-semibold text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20"
              >
                <span>다음 레벨</span>
                <Play className="w-4 h-4 fill-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6-b. 게임 오버 모달 */}
      {gameState === 'lost' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-zinc-850 border border-rose-500/30 rounded-2xl p-6 w-full max-w-md text-center shadow-2xl animate-scale-up">
            <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500 animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-bold text-zinc-100 mb-1">게임 오버!</h2>
            <p className="text-sm text-zinc-400 mb-6">선이 교차하거나 다른 색의 점을 침범하여 탈락했습니다.</p>

            <button
              onClick={() => resetGame(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-sm font-semibold text-white transition-all shadow-md shadow-red-500/20"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      )}

      {/* 7. 게임 설명 가이드 모달 */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-zinc-850 border border-zinc-700/50 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center mb-4 text-blue-400">
              <HelpCircle className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold text-zinc-100 mb-3">색상 선 연결 게임 방법</h2>
            
            <div className="space-y-3 text-sm text-zinc-300 mb-6">
              <p className="leading-relaxed">
                1. <strong>동일한 색상 및 알파벳</strong>을 가진 두 개의 점을 클릭 또는 터치 드래그하여 선으로 연결하세요.
              </p>
              <p className="leading-relaxed">
                2. 선은 격자 제약 없이 <strong>모든 방향으로 자유롭게</strong> 그릴 수 있습니다.
              </p>
              <p className="leading-relaxed">
                3. 단, 자신이 그리는 선이 <strong>자신의 선, 다른 기존 선, 혹은 다른 색의 점</strong>과 교차하거나 겹치면 <strong>그 즉시 탈락(Game Over)</strong>됩니다!
              </p>
              <p className="leading-relaxed">
                4. <span className="text-indigo-400 font-semibold">클리어 조건:</span> 선들을 겹치지 않게 우회하여 모든 색상의 점 쌍을 서로 연결하면 성공합니다!
              </p>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-sm font-semibold text-white transition-all shadow-md shadow-indigo-500/10"
            >
              게임 시작하기
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
