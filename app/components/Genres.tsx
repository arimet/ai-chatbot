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
        console.log('data', data)
        setCategories(data.genres)
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    }

    fetchCategories()
  }, [])
  const handleGenreClick = async (genreId: number) => {
    const display = await submitUserMessage(
      `show movies with genre id ${genreId}`
    )

    console.log('handleGenreClick', display, genreId)

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
          {categories?.map(category => (
            <div
              key={category.id}
              className={`cursor-pointer shadow-lg rounded-lg p-6 transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg`}
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
