import { useState } from 'react'

function WordCard({ word }) {
  const [isFormal, setIsFormal] = useState(true)

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ms-MY'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    } else {
      alert('お使いのブラウザは音声合成をサポートしていません。')
    }
  }

  const currentWord = isFormal ? word.formal : word.informal

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-indigo-600">{currentWord}</h2>
        <button
          onClick={() => speakText(currentWord)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors"
          aria-label="音声再生"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.617a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <p className="text-gray-600 mb-4">{word.meaning}</p>

      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isFormal}
            onChange={(e) => setIsFormal(e.target.checked)}
            className="sr-only"
          />
          <div className="relative">
            <div
              className={`block w-14 h-8 rounded-full transition-colors ${
                isFormal ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                isFormal ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            {isFormal ? '正式形' : '日常の短縮形'}
          </span>
        </label>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 mb-2">例文:</h3>
        {word.examples.map((example, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="text-indigo-700 font-medium flex-1">
                {example.malay}
              </p>
              <button
                onClick={() => speakText(example.malay)}
                className="ml-2 text-blue-500 hover:text-blue-600 transition-colors"
                aria-label="例文を音声再生"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.617a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 text-sm">{example.japanese}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WordCard

