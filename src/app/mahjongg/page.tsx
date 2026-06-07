'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, RotateCcw, HelpCircle, Shuffle, Play, Pause, Trophy, 
  Volume2, VolumeX, Sparkles, RefreshCw, AlertTriangle, CheckCircle
} from 'lucide-react';
import { MAHJONGG_MAPS, MahjonggMap } from '@/data/mahjonggData';
import { 
  TileInstance, createBoard, isOpenTile, isMatchable, findAvailableMatches 
} from '@/domain/mahjonggTypes';
import '@/styles/tile.css';

export default function MahjonggPage() {
  const [maps] = useState<MahjonggMap[]>(MAHJONGG_MAPS);
  const [selectedMapIndex, setSelectedMapIndex] = useState(0);
  const currentMap = maps[selectedMapIndex];

  // Game Board States
  const [tiles, setTiles] = useState<TileInstance[]>([]);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [history, setHistory] = useState<[TileInstance, TileInstance][]>([]);
  const [hintPair, setHintPair] = useState<[string, string] | null>(null);
  
  // Game Control States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'deadlock' | 'won'>('idle');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Highest Scores (Map Name -> best time in seconds)
  const [highScores, setHighScores] = useState<Record<string, number>>({});

  // Responsive scaling elements
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardScale, setBoardScale] = useState(1);

  // Audio References for game sounds using Web Audio API (or synthesizer oscillator to ensure zero-dependency sound)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load High Scores from localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem('mahjongg_highscores');
    if (savedScores) {
      try {
        setHighScores(JSON.parse(savedScores));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Responsive Scaling Logic
  const handleResize = () => {
    if (!containerRef.current || tiles.length === 0) return;
    const padding = 32;
    const containerWidth = containerRef.current.clientWidth - padding;
    const containerHeight = containerRef.current.clientHeight - padding;

    const boardDims = getBoardDimensions();
    const scaleX = containerWidth / boardDims.width;
    const scaleY = containerHeight / boardDims.height;
    
    // Scale can go down to 0.25 for small viewport and up to 1.8x for large screen
    const fitScale = Math.min(scaleX, scaleY);
    setBoardScale(Math.max(0.25, Math.min(fitScale, 1.8)));
  };

  useEffect(() => {
    if (isPlaying && tiles.length > 0) {
      // Small timeout to allow container layout to paint before calculating bounds
      const timer = setTimeout(handleResize, 120);
      window.addEventListener('resize', handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isPlaying, tiles, selectedMapIndex, isPaused]);

  // Timer Effect
  useEffect(() => {
    if (isPlaying && !isPaused && gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, isPaused, gameStatus]);

  // Audio Sound player (Synthesized to bypass static assets requirements)
  const playSound = (type: 'select' | 'match' | 'mismatch' | 'shuffle' | 'win' | 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const playTone = (freq: number, duration: number, type: OscillatorType = 'sine', delay = 0) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.value = freq;
          
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + duration);
        }, delay * 1000);
      };

      if (type === 'select') {
        playTone(523.25, 0.1, 'sine'); // C5
      } else if (type === 'match') {
        playTone(587.33, 0.08, 'sine', 0); // D5
        playTone(880.00, 0.15, 'sine', 0.05); // A5
      } else if (type === 'mismatch') {
        playTone(220.00, 0.25, 'triangle'); // A3
      } else if (type === 'shuffle') {
        playTone(330.00, 0.05, 'sawtooth', 0);
        playTone(440.00, 0.05, 'sawtooth', 0.05);
        playTone(550.00, 0.05, 'sawtooth', 0.1);
      } else if (type === 'click') {
        playTone(440.00, 0.04, 'sine');
      } else if (type === 'win') {
        // Simple celebratory arpeggio
        playTone(523.25, 0.15, 'sine', 0); // C5
        playTone(659.25, 0.15, 'sine', 0.1); // E5
        playTone(783.99, 0.15, 'sine', 0.2); // G5
        playTone(1046.50, 0.4, 'sine', 0.3); // C6
      }
    } catch (e) {
      console.warn('Audio synthesis failed:', e);
    }
  };

  // Start new game
  const handleStartNewGame = () => {
    playSound('shuffle');
    const newBoard = createBoard(currentMap.slots);
    setTiles(newBoard);
    setSelectedTileId(null);
    setHistory([]);
    setHintPair(null);
    setTime(0);
    setIsPlaying(true);
    setIsPaused(false);
    
    // Check if initial board has matches (rare to have 0 on start, but possible)
    const initialMatches = findAvailableMatches(newBoard);
    if (initialMatches.length === 0) {
      setGameStatus('deadlock');
    } else {
      setGameStatus('playing');
    }
  };

  // Reset current board (same tiles, just restore them)
  const handleResetGame = () => {
    playSound('click');
    setTiles(prev => prev.map(t => ({ ...t, isRemoved: false })));
    setSelectedTileId(null);
    setHistory([]);
    setHintPair(null);
    setTime(0);
    setIsPaused(false);
    setGameStatus('playing');
  };

  // Switch layouts
  const handleMapChange = (index: number) => {
    playSound('click');
    setSelectedMapIndex(index);
    setIsPlaying(false);
    setGameStatus('idle');
    setTiles([]);
    setSelectedTileId(null);
  };

  // Undo last action
  const handleUndo = () => {
    if (history.length === 0 || isPaused) return;
    playSound('click');
    const newHistory = [...history];
    const lastPair = newHistory.pop();
    
    if (lastPair) {
      const [tileA, tileB] = lastPair;
      setTiles(prev => prev.map(t => {
        if (t.id === tileA.id || t.id === tileB.id) {
          return { ...t, isRemoved: false };
        }
        return t;
      }));
      setHistory(newHistory);
      setSelectedTileId(null);
      setHintPair(null);
      
      // Clear won state if returning from win
      if (gameStatus === 'won' || gameStatus === 'deadlock') {
        setGameStatus('playing');
      }
    }
  };

  // Hint feature
  const handleHint = () => {
    if (isPaused || gameStatus !== 'playing') return;
    playSound('select');
    const matches = findAvailableMatches(tiles);
    if (matches.length > 0) {
      const randomMatch = matches[Math.floor(Math.random() * matches.length)];
      setHintPair([randomMatch[0].id, randomMatch[1].id]);
      
      // Clear hint after 3.5 seconds
      setTimeout(() => {
        setHintPair(prev => {
          if (prev && prev[0] === randomMatch[0].id && prev[1] === randomMatch[1].id) {
            return null;
          }
          return prev;
        });
      }, 3500);
    } else {
      setGameStatus('deadlock');
    }
  };

  // Shuffle remaining tiles to escape deadlock
  const handleShuffle = () => {
    if (isPaused || gameStatus === 'won') return;
    playSound('shuffle');
    
    const activeTiles = tiles.filter(t => !t.isRemoved);
    if (activeTiles.length === 0) return;

    // Shuffle active tile types
    const shuffledTypes = activeTiles.map(t => t.type);
    for (let i = shuffledTypes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTypes[i], shuffledTypes[j]] = [shuffledTypes[j], shuffledTypes[i]];
    }

    let shuffleIdx = 0;
    const newTiles = tiles.map(t => {
      if (!t.isRemoved) {
        const type = shuffledTypes[shuffleIdx++];
        return { ...t, type };
      }
      return t;
    });

    setTiles(newTiles);
    setSelectedTileId(null);
    setHintPair(null);

    // Recheck matches
    const newMatches = findAvailableMatches(newTiles);
    if (newMatches.length === 0) {
      setGameStatus('deadlock');
    } else {
      setGameStatus('playing');
    }
  };

  // Click on a tile
  const handleTileClick = (tile: TileInstance) => {
    if (!isPlaying || isPaused || gameStatus !== 'playing' || tile.isRemoved) return;
    
    // Check if tile is open/playable
    if (!isOpenTile(tile, tiles)) {
      playSound('mismatch');
      return;
    }

    // Clear hint if present
    setHintPair(null);

    // If no tile selected, select this one
    if (selectedTileId === null) {
      setSelectedTileId(tile.id);
      playSound('select');
      return;
    }

    // If clicking the same tile, deselect it
    if (selectedTileId === tile.id) {
      setSelectedTileId(null);
      playSound('click');
      return;
    }

    // Find the previously selected tile
    const prevTile = tiles.find(t => t.id === selectedTileId);
    if (!prevTile) {
      setSelectedTileId(tile.id);
      playSound('select');
      return;
    }

    // Check match
    if (isMatchable(prevTile.type, tile.type)) {
      playSound('match');
      const updatedTiles = tiles.map(t => {
        if (t.id === prevTile.id || t.id === tile.id) {
          return { ...t, isRemoved: true };
        }
        return t;
      });

      setTiles(updatedTiles);
      setHistory(prev => [...prev, [prevTile, tile]]);
      setSelectedTileId(null);

      // Check win condition
      const remainingTiles = updatedTiles.filter(t => !t.isRemoved).length;
      if (remainingTiles === 0) {
        setGameStatus('won');
        playSound('win');
        
        // Save score if it's the new high score
        const previousBest = highScores[currentMap.name];
        if (!previousBest || time < previousBest) {
          const newScores = { ...highScores, [currentMap.name]: time };
          setHighScores(newScores);
          localStorage.setItem('mahjongg_highscores', JSON.stringify(newScores));
        }
      } else {
        // Check for deadlock
        const matches = findAvailableMatches(updatedTiles);
        if (matches.length === 0) {
          setGameStatus('deadlock');
        }
      }
    } else {
      // Not matchable - select the new tile if it is also open, otherwise deselect
      playSound('mismatch');
      setSelectedTileId(tile.id);
    }
  };

  // Format time (MM:SS)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Find board bounds for responsive centering
  const getBoardDimensions = () => {
    if (tiles.length === 0) return { width: 800, height: 600 };
    
    // Find min/max values
    let maxX = 0;
    let maxY = 0;
    
    tiles.forEach(t => {
      if (t.x > maxX) maxX = t.x;
      if (t.y > maxY) maxY = t.y;
    });

    // Scaled to match new 72x96 size
    return {
      width: maxX * 36 + 72 + 80,
      height: maxY * 48 + 96 + 100,
    };
  };

  const dimensions = getBoardDimensions();
  const activeTilesCount = tiles.filter(t => !t.isRemoved).length;
  const matchablePairs = tiles.length > 0 ? findAvailableMatches(tiles) : [];

  return (
    <main className="h-screen bg-slate-950 text-slate-100 flex flex-col p-3 overflow-hidden select-none">
      {/* Header bar - Extremely compact */}
      <header className="w-full flex justify-between items-center pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-1 bg-slate-900 rounded hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-100">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-base font-bold flex items-center gap-1.5 leading-none">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              마작 솔리테어
            </h1>
          </div>
        </div>

        {/* Stats Row - Compact inline */}
        {isPlaying && !isPaused && (
          <div className="flex gap-4 items-center bg-slate-900/60 px-3 py-1 rounded border border-slate-800/60 text-xs font-mono">
            <div>
              <span className="text-slate-500 mr-1.5">시간:</span>
              <span className="text-emerald-400 font-bold">{formatTime(time)}</span>
            </div>
            <div className="w-px h-3 bg-slate-800" />
            <div>
              <span className="text-slate-500 mr-1.5">남은 패:</span>
              <span className="text-slate-200 font-bold">{activeTilesCount}/{tiles.length}</span>
            </div>
            <div className="w-px h-3 bg-slate-800" />
            <div>
              <span className="text-slate-500 mr-1.5">매치:</span>
              <span className={`font-bold ${matchablePairs.length > 0 ? 'text-blue-400' : 'text-rose-400'}`}>
                {matchablePairs.length}쌍
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900/60 px-2 py-1 rounded text-xs border border-slate-800/60 text-yellow-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>{highScores[currentMap.name] ? formatTime(highScores[currentMap.name]) : '--:--'}</span>
          </div>

          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 bg-slate-900 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all"
            title="소리"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Control panel & Map selection - Compact strip */}
      <section className="w-full flex gap-3 items-center justify-between py-1.5 border-b border-slate-900/80">
        <div className="flex items-center gap-2">
          <select 
            value={selectedMapIndex}
            onChange={(e) => handleMapChange(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 text-slate-200 py-1 px-2 rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {maps.map((map, idx) => (
              <option key={map.name} value={idx}>
                {map.name} ({map.slots.length}패)
              </option>
            ))}
          </select>
        </div>

        {/* Controls Toolbar - Compact small buttons */}
        <div className="flex items-center gap-1.5">
          {!isPlaying ? (
            <button 
              onClick={handleStartNewGame}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-4 rounded text-xs transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              게임 시작
            </button>
          ) : (
            <>
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white py-1 px-2.5 rounded border border-slate-800 transition-all text-xs font-medium"
              >
                {isPaused ? '이어하기' : '일시정지'}
              </button>

              <button 
                onClick={handleUndo}
                disabled={history.length === 0 || isPaused}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white py-1 px-2.5 rounded border border-slate-800 transition-all text-xs font-medium disabled:opacity-40 disabled:pointer-events-none"
              >
                되돌리기
              </button>

              <button 
                onClick={handleHint}
                disabled={isPaused || gameStatus !== 'playing'}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white py-1 px-2.5 rounded border border-slate-800 transition-all text-xs font-medium disabled:opacity-40 disabled:pointer-events-none"
              >
                힌트
              </button>

              <button 
                onClick={handleShuffle}
                disabled={isPaused || activeTilesCount === 0 || gameStatus === 'won'}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white py-1 px-2.5 rounded border border-slate-800 transition-all text-xs font-medium disabled:opacity-40 disabled:pointer-events-none"
              >
                섞기
              </button>

              <button 
                onClick={handleResetGame}
                className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 py-1 px-2.5 rounded border border-rose-950 transition-all text-xs font-medium"
              >
                재시작
              </button>
            </>
          )}
        </div>
      </section>

      {/* Main Game Board viewport - Responsive Flexible area */}
      <section 
        ref={containerRef}
        className="flex-1 w-full flex justify-center items-center overflow-hidden relative bg-slate-950/20 p-2"
      >
        {!isPlaying ? (
          <div className="w-full max-w-lg bg-slate-900/35 border border-slate-800/60 rounded-xl flex flex-col justify-center items-center p-6 text-center backdrop-blur-xs">
            <div className="w-14 h-14 bg-emerald-950/30 border border-emerald-800/40 rounded-full flex items-center justify-center text-emerald-400 mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-200 mb-1.5">{currentMap.name} 레이아웃</h2>
            <p className="text-slate-400 max-w-sm mb-5 text-xs leading-relaxed">
              상단이 막히지 않고 좌우 중 한쪽 면이 열린 동일한 기호의 타일 2개를 맞추어 제거하세요.
            </p>
            <button 
              onClick={handleStartNewGame}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-md active:scale-95 text-sm"
            >
              시작하기
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
            {/* Overlay for pause state */}
            {isPaused && (
              <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center text-center">
                <Pause className="w-12 h-12 text-emerald-400 mb-3 animate-pulse" />
                <h3 className="text-lg font-bold mb-1">일시 정지됨</h3>
                <button 
                  onClick={() => { playSound('click'); setIsPaused(false); }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-4 rounded text-xs transition-all"
                >
                  이어하기
                </button>
              </div>
            )}

            {/* Victory overlay */}
            {gameStatus === 'won' && (
              <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center text-center p-4">
                <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-500/50 rounded-full flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">성공했습니다!</h3>
                <p className="text-emerald-400 text-base font-bold mb-4 font-mono">기록: {formatTime(time)}</p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={handleStartNewGame}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-4 rounded text-xs transition-all"
                  >
                    새 게임
                  </button>
                  <Link 
                    href="/"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-1.5 px-4 rounded text-xs transition-all border border-slate-700"
                  >
                    로비로
                  </Link>
                </div>
              </div>
            )}

            {/* Deadlock Warning overlay */}
            {gameStatus === 'deadlock' && (
              <div className="absolute top-2 bg-rose-950/95 text-rose-200 border border-rose-800/80 px-4 py-2 rounded-lg z-40 flex items-center gap-2.5 shadow-lg shadow-rose-950/50 animate-pulse">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <div className="text-left text-xs">
                  <span className="font-bold mr-2">가능한 매치가 없습니다!</span>
                  <button 
                    onClick={handleShuffle}
                    className="bg-rose-900 hover:bg-rose-800 text-white font-bold py-0.5 px-2 rounded transition-colors border border-rose-700 text-[10px]"
                  >
                    패 섞기
                  </button>
                </div>
              </div>
            )}

            {/* The 3D styled game board with Dynamic Responsive Scale */}
            <div 
              className="mahjong-board-container transition-transform duration-300"
              style={{
                width: dimensions.width,
                height: dimensions.height,
                transform: `scale(${boardScale})`,
                transformOrigin: 'center center',
              }}
            >
              <div className="mahjong-board w-full h-full">
                {tiles.map((tile) => {
                  if (tile.isRemoved) return null;
                  
                  const isTileOpen = isOpenTile(tile, tiles);
                  const isSelected = selectedTileId === tile.id;
                  const isHint = hintPair ? (hintPair[0] === tile.id || hintPair[1] === tile.id) : false;

                  const leftPos = 40 + (tile.x * 36);
                  const topPos = 40 + (tile.y * 48);

                  const tileGroupClass = `tile-symbol-${tile.type.group}`;
                  const zLayerClass = `z-layer-${tile.z}`;
                  
                  const tileClasses = [
                    'mahjong-tile',
                    zLayerClass,
                    isTileOpen ? 'tile-open' : 'tile-locked',
                    isSelected ? 'tile-selected' : '',
                    isHint ? 'tile-hint' : ''
                  ].filter(Boolean).join(' ');

                  return (
                    <div 
                      key={tile.id}
                      className={tileClasses}
                      style={{
                        left: `${leftPos}px`,
                        top: `${topPos}px`,
                        zIndex: (tile.z * 1000) + (tile.y * 10) + tile.x,
                      }}
                      onClick={() => handleTileClick(tile)}
                    >
                      <div className="mahjong-tile-inner">
                        <span className={tileGroupClass}>{tile.type.symbol}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
