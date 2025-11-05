"use client";
import { useEffect, useRef, useState } from 'react';

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function startGame() {
    setIsRunning(true);
    setScore(0);
    setGameOver(false);
  }

  useEffect(() => {
    if (!isRunning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let carY = 150;
    let obstacles: Obstacle[] = [];
    let currentScore = 0;
    let lastSpawnTime = performance.now();

    function moveUp() {
      if (carY > 50) carY -= 50;
    }

    function moveDown() {
      if (carY < 150) carY += 50;
    }

    function checkCollision(): boolean {
      return obstacles.some(obstacle => 
        50 < obstacle.x + obstacle.width && // Car collides in x-axis
        50 + 20 > obstacle.x && 
        carY < obstacle.y + obstacle.height && 
        carY + 20 > obstacle.y
      );
    }

    function update(time: number) {
      if (!isRunning || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw car
      ctx.fillStyle = 'black';
      ctx.fillRect(50, carY, 20, 20);

      // Spawn obstacles
      if (time - lastSpawnTime > (Math.random() * (500) + Math.max(300, 1000 - currentScore*10))) {
        const pos = [50, 100, 150];
        const randomY = pos[Math.floor(Math.random() * 3)];
        obstacles.push({ x: 500, y: randomY, width: 20, height: 30, speed: 5 + (currentScore/10)});
        lastSpawnTime = time;
        //double spawns
        if((currentScore > 10 && Math.random() > 0.5) || currentScore > 30){
          obstacles.push({ x: 500, y: (randomY)%150 + 50 , width: 20, height: 30, speed: 5 + (currentScore/10)});
          lastSpawnTime = time;
        }
        currentScore++;
        setScore(currentScore);
      }

      // Update and draw obstacles
      ctx.fillStyle = 'red';
      obstacles.forEach(obstacle => {
        obstacle.x -= obstacle.speed;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Remove off-screen obstacles
      obstacles = obstacles.filter(obstacle => obstacle.x > -20);

      // Check collision
      if (checkCollision()) {
        setIsRunning(false);
        setGameOver(true);
        setHighScore(prev => Math.max(prev, currentScore));
        return;
      }

      // Increase score
      requestAnimationFrame(update);
    }

    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp') moveUp();
      if (e.code === 'ArrowDown') moveDown();
    });
    
    update(performance.now());
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center" style={{ marginTop: '25vh' }}>
      <h1 className="text-3xl font-bold text-white">Car Jumper</h1>
      <canvas ref={canvasRef} width={500} height={200} className="border border-black m-5 bg-white" />
      <p className="mt-2 text-xl">Score: {Math.floor(score)}</p>
      <p className="mt-2 text-xl">High Score: {Math.floor(highScore)}</p>
      {gameOver && <p className="mt-4 text-red-500 text-2xl">Game Over</p>}
      
      {!isRunning && highScore==0 && (
        <p className="mt-2 text-xl">Press up and down key to play. Dodge the obstacles.</p>
      )}

      {!isRunning && (
      <button onClick={startGame} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Start Game
      </button>
      )}
    </div>
  );
}