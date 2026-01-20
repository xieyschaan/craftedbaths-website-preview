'use client'

import { useState } from 'react'

interface FAQItemProps {
  question: string
  answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-2 border-gray-200 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-spacing-lg py-spacing-md flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-h5 text-black pr-spacing-md">
          {question}
        </span>
        <span className="text-black font-bold text-xl flex-shrink-0">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="px-spacing-lg pb-spacing-md">
          <div className="pt-spacing-sm border-t border-gray-200">
            <p className="font-body text-gray-700 whitespace-pre-line">
              {answer}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
