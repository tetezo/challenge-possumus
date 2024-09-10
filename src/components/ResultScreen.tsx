import React from 'react'

interface ResultScreenProps {
    score: number,
    onRestart: () => void,
    onExit: () => void,
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, onRestart, onExit }) => {
  return (
    <div className='container col-4'>
        <h1 className='subtitle'>Tu puntaje: {score}</h1>
        <button
            className='btn btn-primary'
            onClick={onRestart}
        >
            Reiniciar
        </button>
        <button
            className='btn btn-secondary ms-2'
            onClick={onExit}
        >
            Salir
        </button>
    </div>
  )
}

export default ResultScreen