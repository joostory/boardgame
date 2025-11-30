"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Types
interface Piece {
    id: number;
    currentX: number;
    currentY: number;
    correctX: number;
    correctY: number;
    isSolved: boolean;
    shape: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}

const IMAGES = [
    { id: "nature", src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop", label: "자연 (Nature)" },
    { id: "city", src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop", label: "도시 (City)" },
    { id: "cat", src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop", label: "고양이 (Cat)" },
];

const DIFFICULTIES = [
    { id: "easy", label: "쉬움 (3x3)", rows: 3, cols: 3 },
    { id: "medium", label: "보통 (4x4)", rows: 4, cols: 4 },
    { id: "hard", label: "어려움 (5x5)", rows: 5, cols: 5 },
];

export default function JigsawGame() {
    const [selectedImage, setSelectedImage] = useState(IMAGES[0].src);
    const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedPieceId, setDraggedPieceId] = useState<number | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [gameWon, setGameWon] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 600, height: 400 });

    // Initialize game
    useEffect(() => {
        initializeGame();
    }, [selectedImage, difficulty]);

    const initializeGame = () => {
        const { rows, cols } = difficulty;
        const pieceWidth = containerSize.width / cols;
        const pieceHeight = containerSize.height / rows;
        const newPieces: Piece[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const shape = {
                    top: row === 0 ? 0 : -newPieces[newPieces.length - cols].shape.bottom,
                    right: col === cols - 1 ? 0 : Math.random() > 0.5 ? 1 : -1,
                    bottom: row === rows - 1 ? 0 : Math.random() > 0.5 ? 1 : -1,
                    left: col === 0 ? 0 : -newPieces[newPieces.length - 1].shape.right,
                };

                newPieces.push({
                    id: row * cols + col,
                    currentX: Math.random() * (containerSize.width - pieceWidth),
                    currentY: Math.random() * (containerSize.height - pieceHeight),
                    correctX: col * pieceWidth,
                    correctY: row * pieceHeight,
                    isSolved: false,
                    shape,
                });
            }
        }
        setPieces(newPieces);
        setGameWon(false);
    };

    const handlePointerDown = (e: React.PointerEvent, piece: Piece) => {
        if (piece.isSolved) return;

        e.preventDefault();
        setIsDragging(true);
        setDraggedPieceId(piece.id);

        // Bring to front
        setPieces(prev => {
            const others = prev.filter(p => p.id !== piece.id);
            return [...others, piece];
        });

        setOffset({
            x: e.clientX - piece.currentX,
            y: e.clientY - piece.currentY,
        });
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || draggedPieceId === null) return;
        e.preventDefault();

        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;

        setPieces(prev => prev.map(p => {
            if (p.id === draggedPieceId) {
                return { ...p, currentX: newX, currentY: newY };
            }
            return p;
        }));
    };

    const handlePointerUp = () => {
        if (!isDragging || draggedPieceId === null) return;

        const piece = pieces.find(p => p.id === draggedPieceId);
        if (piece) {
            const distance = Math.sqrt(
                Math.pow(piece.currentX - piece.correctX, 2) +
                Math.pow(piece.currentY - piece.correctY, 2)
            );

            // Snap distance
            if (distance < 30) {
                setPieces(prev => prev.map(p => {
                    if (p.id === draggedPieceId) {
                        return { ...p, currentX: p.correctX, currentY: p.correctY, isSolved: true };
                    }
                    return p;
                }));
            }
        }

        setIsDragging(false);
        setDraggedPieceId(null);
    };

    // Check win condition
    useEffect(() => {
        if (pieces.length > 0 && pieces.every(p => p.isSolved)) {
            setGameWon(true);
        }
    }, [pieces]);

    // SVG Path Generator for Jigsaw Piece
    const getPiecePath = (width: number, height: number, shape: Piece['shape']) => {
        const tabSize = Math.min(width, height) * 0.2;
        // This is a simplified path generator. 
        // In a real app, we'd use bezier curves for nicer tabs.
        // 0: flat, 1: out, -1: in

        let path = `M 0 0`;

        // Top
        if (shape.top === 0) path += ` L ${width} 0`;
        else path += ` L ${width / 2 - tabSize / 2} 0 L ${width / 2 - tabSize / 2} ${shape.top * -tabSize} L ${width / 2 + tabSize / 2} ${shape.top * -tabSize} L ${width / 2 + tabSize / 2} 0 L ${width} 0`;

        // Right
        if (shape.right === 0) path += ` L ${width} ${height}`;
        else path += ` L ${width} ${height / 2 - tabSize / 2} L ${width + shape.right * tabSize} ${height / 2 - tabSize / 2} L ${width + shape.right * tabSize} ${height / 2 + tabSize / 2} L ${width} ${height / 2 + tabSize / 2} L ${width} ${height}`;

        // Bottom
        if (shape.bottom === 0) path += ` L 0 ${height}`;
        else path += ` L ${width / 2 + tabSize / 2} ${height} L ${width / 2 + tabSize / 2} ${height + shape.bottom * tabSize} L ${width / 2 - tabSize / 2} ${height + shape.bottom * tabSize} L ${width / 2 - tabSize / 2} ${height} L 0 ${height}`;

        // Left
        if (shape.left === 0) path += ` L 0 0`;
        else path += ` L 0 ${height / 2 + tabSize / 2} L ${shape.left * -tabSize} ${height / 2 + tabSize / 2} L ${shape.left * -tabSize} ${height / 2 - tabSize / 2} L 0 ${height / 2 - tabSize / 2} L 0 0`;

        return path;
    };

    const pieceWidth = containerSize.width / difficulty.cols;
    const pieceHeight = containerSize.height / difficulty.rows;

    return (
        <div className="flex flex-col items-center gap-6" onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
            <Card className="p-4 w-full max-w-4xl bg-white/50 backdrop-blur-sm">
                <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                    <div className="flex gap-2 items-center">
                        <span className="font-semibold">이미지:</span>
                        <Select value={selectedImage} onValueChange={setSelectedImage}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="이미지 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                {IMAGES.map(img => (
                                    <SelectItem key={img.id} value={img.src}>{img.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-semibold">난이도:</span>
                        <Select value={difficulty.id} onValueChange={(val) => setDifficulty(DIFFICULTIES.find(d => d.id === val) || DIFFICULTIES[0])}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="난이도 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                {DIFFICULTIES.map(d => (
                                    <SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={initializeGame} variant="outline">다시 시작</Button>
                </div>

                <div
                    ref={containerRef}
                    className="relative bg-gray-200 rounded-lg overflow-hidden shadow-inner mx-auto border-2 border-dashed border-gray-400"
                    style={{ width: containerSize.width, height: containerSize.height }}
                >
                    {/* Background hint (optional, maybe make it faint) */}
                    <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: `url(${selectedImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />

                    {pieces.map((piece) => (
                        <div
                            key={piece.id}
                            onPointerDown={(e) => handlePointerDown(e, piece)}
                            className={`absolute cursor-grab active:cursor-grabbing transition-shadow ${piece.isSolved ? 'z-0' : 'z-10 hover:z-20'}`}
                            style={{
                                left: piece.currentX,
                                top: piece.currentY,
                                width: pieceWidth,
                                height: pieceHeight,
                                // We need to expand the div to accommodate tabs
                                // This is tricky with simple divs. 
                                // Better approach: Use SVG for each piece.
                            }}
                        >
                            {/* 
                  Actually, for true jigsaw shapes, we need to render an SVG that is slightly larger than pieceWidth/Height 
                  to account for the tabs sticking out.
                  Let's adjust the container and positioning logic slightly.
               */}
                        </div>
                    ))}

                    {/* Re-implementing pieces as SVGs for proper shaping */}
                    {pieces.map((piece) => {
                        // Calculate extra space needed for tabs
                        const tabSize = Math.min(pieceWidth, pieceHeight) * 0.25;
                        const viewBoxWidth = pieceWidth + tabSize * 2;
                        const viewBoxHeight = pieceHeight + tabSize * 2;

                        // Adjust position to account for the extra padding in SVG
                        // The "logical" top-left of the piece (excluding out-tabs) is at (tabSize, tabSize) inside the SVG
                        const left = piece.currentX - tabSize;
                        const top = piece.currentY - tabSize;

                        // Generate path relative to the SVG coordinate system where (tabSize, tabSize) is the top-left of the main rect
                        // We need a better path generator that takes offsets.

                        return (
                            <div
                                key={piece.id}
                                onPointerDown={(e) => handlePointerDown(e, piece)}
                                className={`absolute cursor-grab active:cursor-grabbing ${piece.isSolved ? 'z-0 pointer-events-none' : 'z-10 hover:z-20 drop-shadow-lg'}`}
                                style={{
                                    transform: `translate(${left}px, ${top}px)`,
                                    width: viewBoxWidth,
                                    height: viewBoxHeight,
                                    touchAction: 'none', // Important for pointer events
                                }}
                            >
                                <svg width={viewBoxWidth} height={viewBoxHeight} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
                                    <defs>
                                        <clipPath id={`clip-${piece.id}`}>
                                            <path d={getPiecePathWithOffset(pieceWidth, pieceHeight, piece.shape, tabSize)} />
                                        </clipPath>
                                    </defs>
                                    <image
                                        href={selectedImage}
                                        x={-piece.correctX + tabSize}
                                        y={-piece.correctY + tabSize}
                                        width={containerSize.width}
                                        height={containerSize.height}
                                        preserveAspectRatio="none" // Or cover logic
                                        clipPath={`url(#clip-${piece.id})`}
                                    />
                                    <path
                                        d={getPiecePathWithOffset(pieceWidth, pieceHeight, piece.shape, tabSize)}
                                        fill="none"
                                        stroke="rgba(0,0,0,0.3)"
                                        strokeWidth="1"
                                    />
                                </svg>
                            </div>
                        );
                    })}

                </div>
            </Card>

            {gameWon && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <Card className="p-8 flex flex-col items-center gap-4 animate-in zoom-in">
                        <h2 className="text-4xl font-bold text-primary">축하합니다!</h2>
                        <p className="text-xl">퍼즐을 완성하셨습니다!</p>
                        <Button onClick={initializeGame} size="lg">다시 하기</Button>
                    </Card>
                </div>
            )}
        </div>
    );
}

// Helper to generate path with offset for tabs
function getPiecePathWithOffset(width: number, height: number, shape: Piece['shape'], tabSize: number) {
    const startX = tabSize;
    const startY = tabSize;

    let path = `M ${startX} ${startY}`;

    // Top
    if (shape.top === 0) {
        path += ` L ${startX + width} ${startY}`;
    } else {
        const mid = startX + width / 2;
        const sign = shape.top; // -1 (in) or 1 (out)
        // Bezier curve for tab
        path += ` L ${mid - tabSize / 2} ${startY}`;
        path += ` C ${mid - tabSize / 2} ${startY - sign * tabSize} ${mid + tabSize / 2} ${startY - sign * tabSize} ${mid + tabSize / 2} ${startY}`;
        path += ` L ${startX + width} ${startY}`;
    }

    // Right
    if (shape.right === 0) {
        path += ` L ${startX + width} ${startY + height}`;
    } else {
        const mid = startY + height / 2;
        const sign = shape.right;
        path += ` L ${startX + width} ${mid - tabSize / 2}`;
        path += ` C ${startX + width + sign * tabSize} ${mid - tabSize / 2} ${startX + width + sign * tabSize} ${mid + tabSize / 2} ${startX + width} ${mid + tabSize / 2}`;
        path += ` L ${startX + width} ${startY + height}`;
    }

    // Bottom
    if (shape.bottom === 0) {
        path += ` L ${startX} ${startY + height}`;
    } else {
        const mid = startX + width / 2;
        const sign = shape.bottom;
        path += ` L ${mid + tabSize / 2} ${startY + height}`;
        path += ` C ${mid + tabSize / 2} ${startY + height + sign * tabSize} ${mid - tabSize / 2} ${startY + height + sign * tabSize} ${mid - tabSize / 2} ${startY + height}`;
        path += ` L ${startX} ${startY + height}`;
    }

    // Left
    if (shape.left === 0) {
        path += ` L ${startX} ${startY}`;
    } else {
        const mid = startY + height / 2;
        const sign = shape.left;
        path += ` L ${startX} ${mid + tabSize / 2}`;
        path += ` C ${startX - sign * tabSize} ${mid + tabSize / 2} ${startX - sign * tabSize} ${mid - tabSize / 2} ${startX} ${mid - tabSize / 2}`;
        path += ` L ${startX} ${startY}`;
    }

    return path;
}
