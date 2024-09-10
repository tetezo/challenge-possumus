import React, { useEffect, useState } from 'react'

interface MainScreenProps {
    onStartGame: (category: string, difficulty: string) => void
}

interface Category {
    id: number,
    name: string
}

const MainScreen: React.FC<MainScreenProps> = ({ onStartGame }) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('easy')

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => setCategories(data.trivia_categories))
    }, [])

    const handleStart = () => {
        if (selectedCategory && selectedDifficulty) {
            onStartGame(selectedCategory, selectedDifficulty)
        }
    }

  return (
    <div className='container col-4'>
        <h1 className='title'>Configura tu trivia</h1>
        <div className='form-group'>
            <label>Temática</label>
            <select 
                className='form-control'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Seleccione una temática</option>
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
                </select>
        </div>
        <div className='form-group'>
            <label>Dificultad</label>
            <select 
                className='form-control'
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
                <option value="easy">Fácil</option>
                <option value="medium">Media</option>
                <option value="hard">Difícil</option>
            </select>
        </div>
        <button
            className='btn btn-primary mt-2'
            onClick={handleStart}
        >
            Jugar!
        </button>
    </div>
  )
}

export default MainScreen