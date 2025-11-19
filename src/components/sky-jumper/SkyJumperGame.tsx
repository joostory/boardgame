'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Platform {
    id: number
    x: number
    y: number
    width: number
    isMoving?: boolean
    speed?: number
}

interface GameState {
    isPlaying: boolean
    isGameOver: boolean
    score: number
    highScore: number
}

const GRAVITY = 0.4
const JUMP_FORCE = -12 // Increased jump force
const MOVEMENT_SPEED = 5
const GAME_WIDTH = 400
const GAME_HEIGHT = 600
const PLATFORM_HEIGHT = 20
const PLAYER_SIZE = 40

export default function SkyJumperGame() {
    const [gameState, setGameState] = useState<GameState>({
        isPlaying: false,
        isGameOver: false,
        score: 0,
        highScore: 0,
    })

    // We use state for platforms to render them initially and when they change (add/remove)
    // But we'll use refs for their *positions* during the game loop to avoid re-renders
    const [platforms, setPlatforms] = useState<Platform[]>([])

    const containerRef = useRef<HTMLDivElement>(null)
    const requestRef = useRef<number>(0)
    const playerRef = useRef({
        x: GAME_WIDTH / 2 - PLAYER_SIZE / 2,
        y: GAME_HEIGHT - 150,
        vx: 0,
        vy: 0,
    })
    const platformsRef = useRef<Platform[]>([])
    const scoreRef = useRef(0)
    const cameraYRef = useRef(0)
    const playingRef = useRef(false)

    // Refs for direct DOM manipulation
    const playerElemRef = useRef<HTMLDivElement>(null)
    const platformElemsRef = useRef<Map<number, HTMLDivElement>>(new Map())

    // Load high score
    useEffect(() => {
        const saved = localStorage.getItem('sky-jumper-highscore')
        if (saved) {
            setGameState(prev => ({ ...prev, highScore: parseInt(saved) }))
        }
    }, [])

    const initGame = () => {
        playerRef.current = {
            x: GAME_WIDTH / 2 - PLAYER_SIZE / 2,
            y: GAME_HEIGHT - 150,
            vx: 0,
            vy: 0,
        }
        scoreRef.current = 0
        cameraYRef.current = 0
        playingRef.current = true

        // Initial platforms
        const initialPlatforms = [
            { id: 1, x: GAME_WIDTH / 2 - 50, y: GAME_HEIGHT - 50, width: 100 },
            { id: 2, x: GAME_WIDTH / 2 - 50, y: GAME_HEIGHT - 200, width: 100 },
            { id: 3, x: GAME_WIDTH / 2 - 50, y: GAME_HEIGHT - 350, width: 100 },
            { id: 4, x: GAME_WIDTH / 2 - 50, y: GAME_HEIGHT - 500, width: 100 },
        ]
        platformsRef.current = initialPlatforms
        setPlatforms(initialPlatforms)

        setGameState(prev => ({
            ...prev,
            isPlaying: true,
            isGameOver: false,
            score: 0,
        }))

        if (requestRef.current) cancelAnimationFrame(requestRef.current)
        requestRef.current = requestAnimationFrame(gameLoop)
    }

    const generatePlatform = (minY: number) => {
        // Dynamic difficulty based on score
        const score = scoreRef.current

        // Width decreases as score increases (min 40px)
        // Starts at ~100px, decreases by 5px every 500 score
        const widthReduction = Math.min(60, Math.floor(score / 500) * 5)
        const minWidth = 40
        const maxWidth = 100 - widthReduction
        const width = Math.random() * (maxWidth - minWidth) + minWidth

        // Gap increases as score increases (max 200px)
        // Starts at ~100px, increases by 5px every 500 score
        const gapIncrease = Math.min(100, Math.floor(score / 500) * 5)
        const minGap = 60 + gapIncrease
        const maxGap = 120 + gapIncrease
        const gap = Math.random() * (maxGap - minGap) + minGap

        const x = Math.random() * (GAME_WIDTH - width)
        const y = minY - gap

        return {
            id: Date.now() + Math.random(),
            x,
            y,
            width,
        }
    }

    const gameLoop = () => {
        if (!playingRef.current) return

        const player = playerRef.current
        const currentPlatforms = platformsRef.current

        // Physics
        player.vy += GRAVITY
        player.y += player.vy
        player.x += player.vx

        // Wall collision (wrap around)
        if (player.x < -PLAYER_SIZE / 2) player.x = GAME_WIDTH - PLAYER_SIZE / 2
        if (player.x > GAME_WIDTH - PLAYER_SIZE / 2) player.x = -PLAYER_SIZE / 2

        // Camera movement
        let needsPlatformUpdate = false
        if (player.y < GAME_HEIGHT / 2) {
            const diff = GAME_HEIGHT / 2 - player.y
            player.y = GAME_HEIGHT / 2
            cameraYRef.current += diff
            scoreRef.current += Math.floor(diff)

            // Move platforms down
            currentPlatforms.forEach(p => p.y += diff)

            // Remove platforms below screen
            const activePlatforms = currentPlatforms.filter(p => p.y < GAME_HEIGHT)

            // Add new platforms
            const highestPlatform = activePlatforms[activePlatforms.length - 1]
            if (highestPlatform && highestPlatform.y > 100) {
                activePlatforms.push(generatePlatform(highestPlatform.y))
                needsPlatformUpdate = true
            }

            platformsRef.current = activePlatforms
            if (needsPlatformUpdate) {
                setPlatforms([...activePlatforms]) // Trigger render for new DOM elements
            }
        }

        // Platform collision
        if (player.vy > 0) { // Only check when falling
            currentPlatforms.forEach(p => {
                if (
                    player.x + PLAYER_SIZE * 0.8 > p.x &&
                    player.x + PLAYER_SIZE * 0.2 < p.x + p.width &&
                    player.y + PLAYER_SIZE > p.y &&
                    player.y + PLAYER_SIZE < p.y + PLATFORM_HEIGHT + player.vy + 5 // +5 margin
                ) {
                    player.vy = JUMP_FORCE
                }
            })
        }

        // Game Over
        if (player.y > GAME_HEIGHT) {
            gameOver()
            return
        }

        // Update DOM directly
        if (playerElemRef.current) {
            playerElemRef.current.style.left = `${player.x}px`
            playerElemRef.current.style.top = `${player.y}px`
            playerElemRef.current.style.transform = `scaleX(${player.vx < 0 ? -1 : 1})`
        }

        currentPlatforms.forEach(p => {
            const el = platformElemsRef.current.get(p.id)
            if (el) {
                el.style.top = `${p.y}px`
                // x and width don't change usually, but good to be safe if we add moving platforms later
                el.style.left = `${p.x}px`
            }
        })

        const scoreEl = document.getElementById('score-display')
        if (scoreEl) scoreEl.innerText = `Score: ${scoreRef.current}`

        requestRef.current = requestAnimationFrame(gameLoop)
    }

    const gameOver = () => {
        playingRef.current = false
        const finalScore = scoreRef.current
        const newHighScore = Math.max(gameState.highScore, finalScore)
        localStorage.setItem('sky-jumper-highscore', newHighScore.toString())

        setGameState(prev => ({
            ...prev,
            isPlaying: false,
            isGameOver: true,
            score: finalScore,
            highScore: newHighScore
        }))
        cancelAnimationFrame(requestRef.current)
    }

    // Input handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') playerRef.current.vx = -MOVEMENT_SPEED
            if (e.key === 'ArrowRight') playerRef.current.vx = MOVEMENT_SPEED
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && playerRef.current.vx < 0) playerRef.current.vx = 0
            if (e.key === 'ArrowRight' && playerRef.current.vx > 0) playerRef.current.vx = 0
        }

        const handleTouchStart = (e: TouchEvent) => {
            if (!playingRef.current) return

            e.preventDefault() // Prevent scrolling
            const touchX = e.touches[0].clientX
            const screenWidth = window.innerWidth

            if (touchX < screenWidth / 2) {
                playerRef.current.vx = -MOVEMENT_SPEED
            } else {
                playerRef.current.vx = MOVEMENT_SPEED
            }
        }

        const handleTouchEnd = (e: TouchEvent) => {
            if (!playingRef.current) return
            e.preventDefault()
            playerRef.current.vx = 0
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        // Add touch listeners to the container or window. Window is safer for full screen play.
        // Using non-passive listener to allow preventDefault
        window.addEventListener('touchstart', handleTouchStart, { passive: false })
        window.addEventListener('touchend', handleTouchEnd)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-[800px] mx-auto p-4">
            <div className="flex justify-between w-full max-w-[400px] mb-4 items-center">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <div className="text-xl font-bold" id="score-display">Score: {gameState.score}</div>
                <div className="text-xl font-bold text-yellow-500">High: {gameState.highScore}</div>
            </div>

            <Card
                className="relative overflow-hidden bg-sky-100 border-4 border-sky-300"
                style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            >
                {!gameState.isPlaying && !gameState.isGameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10 text-white">
                        <h1 className="text-4xl font-bold mb-4">Sky Jumper</h1>
                        <p className="mb-8">Use Arrow Keys to Move</p>
                        <Button onClick={initGame} size="lg" className="text-xl px-8">
                            Start Game
                        </Button>
                    </div>
                )}

                {gameState.isGameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 text-white">
                        <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
                        <p className="text-xl mb-6">Score: {gameState.score}</p>
                        <Button onClick={initGame} size="lg" className="text-xl px-8">
                            Try Again
                        </Button>
                    </div>
                )}

                {/* Player */}
                <div
                    ref={playerElemRef}
                    className="absolute bg-red-500 rounded-full transition-transform"
                    style={{
                        width: PLAYER_SIZE,
                        height: PLAYER_SIZE,
                        left: playerRef.current.x,
                        top: playerRef.current.y,
                        transform: `scaleX(${playerRef.current.vx < 0 ? -1 : 1})`
                    }}
                >
                    {/* Simple face */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full" />
                    <div className="absolute bottom-2 left-3 w-4 h-1 bg-white rounded-full" />
                </div>

                {/* Platforms */}
                {platforms.map(platform => (
                    <div
                        key={platform.id}
                        ref={(el) => {
                            if (el) platformElemsRef.current.set(platform.id, el)
                            else platformElemsRef.current.delete(platform.id)
                        }}
                        className="absolute bg-green-500 rounded-full border-b-4 border-green-700"
                        style={{
                            left: platform.x,
                            top: platform.y,
                            width: platform.width,
                            height: PLATFORM_HEIGHT,
                        }}
                    />
                ))}
            </Card>
        </div>
    )
}
