'use client'

import { useActions, useUIState } from 'ai/rsc'
import { ReactNode } from 'react'

export default function Genres() {
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  const categories = [
    { id: 1, name: 'Action', color: 'bg-[#FF69B4]' },
    { id: 2, name: 'Adventure', color: 'bg-[#1E90FF]' },
    { id: 3, name: 'Sport', color: 'bg-[#FFD700]' },
    { id: 4, name: 'Bollywood', color: 'bg-[#6A5ACD]' },
    { id: 5, name: 'Kids', color: 'bg-[#98FB98]' },
    { id: 6, name: 'Musical', color: 'bg-[#FFA07A]' }
  ]

  const handleGenreClick = async (genre: string) => {
    console.log('Handle genre click', genre)
    const { display } = await submitUserMessage(
      `genreLookup ${genre}`
    )

    console.log('Display', display)

    setMessages((messages: ReactNode[]) => [...messages, display])
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container grid gap-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Genres
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Select the genre you want to explore.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(category => (
            <div
              key={category.id}
              className={`rounded-lg p-6 ${category.color} transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg`}
              onClick={async () => {handleGenreClick(category.name)}}
            >
              <h3 className="text-2xl font-bold text-primary-foreground">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
