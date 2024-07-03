'use client'

const MOVIE_API_KEY = process.env.MOVIE_API_KEY

import { useActions, useUIState } from 'ai/rsc'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export default function MoviesByGenre({ genreId }: { genreId: number }) {
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  const [movies, setMovies] = useState<Movie[]>([])
  console.log('movies', movies)

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?certification_country=FR&include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-05-29&release_date.lte=2024-07-10&sort_by=popularity.desc&watch_region=FR&with_genres=${genreId}&with_release_type=3`

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${MOVIE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        setMovies(data.genres)
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    }

    fetchCategories()
  }, [genreId])

  return (
    <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies?.map(movie => (
        <div
          key={movie.id}
          className="relative overflow-hidden rounded-lg group"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
            alt="Movie Poster"
            width={400}
            height={600}
            className="object-cover w-full h-80 group-hover:opacity-50 transition-opacity"
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold md:text-xl">{movie.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {movie.overview}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
