import { useState } from 'react'
import WordCard from './components/WordCard'
import { wordData } from './data/words'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            マレー語学習アプリ
          </h1>
          <p className="text-gray-600">単語を学んで、マレー語をマスターしましょう</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wordData.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

