import { useState, useMemo } from 'react'
import WordCard from './components/WordCard'
import QuizMode from './components/QuizMode'
import { wordData } from './data/words'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('すべて')
  const [mode, setMode] = useState('学習') // '学習' or 'クイズ'

  const categories = ['すべて', '名詞', '動詞', '形容詞', '疑問詞', '代名詞', '助詞']

  const filteredWords = useMemo(() => {
    if (!wordData || !Array.isArray(wordData)) {
      console.error('wordData is not available or not an array')
      return []
    }
    
    let filtered = wordData

    // カテゴリーフィルタ
    if (selectedCategory !== 'すべて') {
      filtered = filtered.filter((word) => word.category === selectedCategory)
    }

    // 検索フィルタ
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (word) =>
          word.meaning.includes(query) ||
          word.formal.toLowerCase().includes(query) ||
          word.informal.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            マレー語学習アプリ
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            単語を学んで、マレー語をマスターしましょう
          </p>
        </header>

        {/* モード切替 */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-md inline-flex">
            <button
              onClick={() => setMode('学習')}
              className={`px-6 py-3 rounded-lg font-semibold text-base md:text-lg transition-all ${
                mode === '学習'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              学習モード
            </button>
            <button
              onClick={() => setMode('クイズ')}
              className={`px-6 py-3 rounded-lg font-semibold text-base md:text-lg transition-all ${
                mode === 'クイズ'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              クイズモード
            </button>
          </div>
        </div>

        {mode === '学習' ? (
          <>
            {/* 検索バー */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="日本語の意味、マレー語（正式・日常）で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-4 text-base md:text-lg rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none shadow-sm"
              />
            </div>

            {/* カテゴリータブ */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-3 rounded-lg font-semibold text-sm md:text-base whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 単語カード表示 */}
            {filteredWords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWords.map((word) => (
                  <WordCard key={word.id} word={word} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-sm">
                検索結果が見つかりませんでした
              </div>
            )}
          </>
        ) : (
          <QuizMode words={filteredWords} />
        )}
      </div>
    </div>
  )
}

export default App
