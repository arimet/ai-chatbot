/* eslint-disable react/jsx-key */
'use client'

import { useState } from 'react'
import { AI } from './actions'
import { useActions, useUIState } from 'ai/rsc'
import { nanoid } from 'nanoid'

export default function Page() {
  const [input, setInput] = useState<string>('')
  const [conversation, setConversation] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  console.log('conversation', conversation)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInput('')
    setConversation(currentConversation => [
      ...currentConversation,
      {
        id: nanoid(),
        role: 'user',
        display: input
      }
    ])
    const message = await submitUserMessage(input)
    setConversation(currentConversation => [...currentConversation, message])
  }

  console.log('message', conversation)

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white p-4 flex items-center">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Movie Selector</h1>
        </div>
      </header>
      <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
        {conversation.map((message, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg inline-block max-w-[70%] ${
              message.role === 'system'
                ? 'border bg-slate-100 text-gray-800'
                : 'bg-blue-500 text-white ml-auto' // Assuming this is the style for 'user'
            }`}
          >
            {message.display}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-950 p-4 flex items-center"
      >
        <input
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 p-2 mr-2"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button>
          <span>Send</span>
        </button>
      </form>
    </div>
  )
}
