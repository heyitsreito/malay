import { useState, useEffect, useCallback } from 'react'

function QuizMode({ words }) {
  const [currentWord, setCurrentWord] = useState(null)
  const [options, setOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  const generateQuestion = useCallback(() => {
    if (!words || words.length === 0) {
      setCurrentWord(null)
      setOptions([])
      return
    }

    try {
      const randomWord = words[Math.floor(Math.random() * words.length)]
      if (!randomWord || !randomWord.meaning) {
        console.error('Invalid word data:', randomWord)
        return
      }

      const wrongAnswers = words
        .filter((w) => w && w.id !== randomWord.id && w.meaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.meaning)

      const allOptions = [randomWord.meaning, ...wrongAnswers].sort(
        () => Math.random() - 0.5
      )

      setCurrentWord(randomWord)
      setOptions(allOptions)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setTotalQuestions((prev) => prev + 1)
    } catch (error) {
      console.error('Error generating question:', error)
    }
  }, [words])

  useEffect(() => {
    generateQuestion()
  }, [generateQuestion])

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return // 既に回答済み

    setSelectedAnswer(answer)
    const correct = answer === currentWord.meaning
    setIsCorrect(correct)
    if (correct) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    generateQuestion()
  }

  if (!words || words.length === 0) {
    return (
      <div className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-sm">
        フィルタ条件に一致する単語がありません。
        <br />
        カテゴリーや検索条件を変更してください。
      </div>
    )
  }

  if (!currentWord) {
    return (
      <div className="text-center text-gray-600">
        問題を読み込んでいます...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="text-center mb-6">
          <div className="text-sm text-gray-500 mb-2">
            スコア: {score} / {totalQuestions}
          </div>
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            {currentWord.informal}
          </h2>
          <p className="text-gray-500 text-sm">
            {currentWord.formal !== currentWord.informal && (
              <>正式形: {currentWord.formal}</>
            )}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : selectedAnswer !== null && option === currentWord.meaning
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              } ${
                selectedAnswer !== null ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className="text-center">
            <div
              className={`text-lg font-semibold mb-4 ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isCorrect ? '正解！' : '不正解'}
            </div>
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizMode

