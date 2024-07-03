'use client'

const MOVIE_API_KEY = process.env.MOVIE_API_KEY

import { useActions, useUIState } from 'ai/rsc'
import { ReactNode, useEffect, useState } from 'react'

export default function Genres() {
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  )

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${MOVIE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        setCategories(data.genres)
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    }

    fetchCategories()
  }, [])
  const handleGenreClick = async (genreId: number) => {
    const {display} = await submitUserMessage(
      `show movies with genre id ${genreId}`
    )

    console.log('handleGenreClick', display, genreId)

    setMessages((messages: ReactNode[]) => [...messages, {display, role: 'system'}])
  }

  return (
    <section className="w-full py-6">
      <div className="container grid gap-6 px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter">
            Genres
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Select the genre you want to explore.
          </p>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {categories?.map(category => (
            <div
              key={category.id}
              className={`cursor-pointer shadow-lg bg-white rounded-lg p-6 transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg`}
              onClick={async () => {
                handleGenreClick(category.id)
              }}
            >
              <h3 className="text-2xl font-bold text-primary">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
