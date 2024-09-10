import React, { useState } from 'react';
import './App.css';
import MainScreen from './components/MainScreen';
import TriviaScreen from './components/TriviaScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'menu' | 'trivia' | 'result'>('menu')
  const [category, setCategory] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<string | null>(null)
  const [score, setScore] = useState<number>(0)

  const startGame = (category: string, difficulty: string) => {
    setCategory(category)
    setDifficulty(difficulty)
    setGameState('trivia')
  }

  const finishGame = (finalScore: number) => {
    setScore(finalScore)
    setGameState('result')
  }
  const restartGame = () => {
    setGameState('trivia')
  }
  const exitGame = () => {
    setGameState('menu')
  }

  return (
    <div className="App">
    {gameState === 'menu' && <MainScreen onStartGame={startGame} />}
    {gameState === 'trivia' && <TriviaScreen category={category!} difficulty={difficulty!} onFinish={finishGame} />}
    {gameState === 'result' && <ResultScreen score={score} onRestart={restartGame} onExit={exitGame} />}
    </div>
  );
}

export default App;
