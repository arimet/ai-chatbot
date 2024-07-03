import { openai } from '@ai-sdk/openai'
import { createAI, streamUI } from 'ai/rsc'
import { z } from 'zod'
import Genres from './components/Genres'
import MoviesByGenre from './components/MoviesByGenre'

export async function submitUserMessage(input: string) {
  'use server'

  console.log('submitUserMessage', input)

  const ui = await streamUI({
    model: openai('gpt-4o'),
    system: `\
    You are a movie theater conversation bot and you can help users select movies, showtimes, and genres, step by step.
    You and the user can discuss movie options, and the user can adjust their movie selection, choose a showtime, or explore different genres in the UI.
    
    If the user wants to explore movies by genre, call \`show_genre_ui\` to show the list of genre movies.
    If the user gives a genre id, call \`movie_lookup_by_genre_id\` to show movies list with this genre id.
    
    If the user wants to book tickets, or complete another task not supported by this demo, respond that you are a demo and cannot do that.
    
    Besides that, you can also chat with users and provide information about movies if needed.`,
    prompt: input,
    text: async ({ content }) => <div>{content}</div>,
    tools: {
      showGenre: {
        description: 'List genre available for movies',
        parameters: z.object({
          genres: z.array(z.string()).describe('The list of genres')
        }),
        generate: async function* () {
          console.log('showGenre')
          return <Genres />
        }
      },
      movieLookupByGenreId: {
        description: 'Look up for list of movies by genre id',
        parameters: z.object({
          genreId: z.number().describe('The id of the genre selected')
        }),
        generate: async function* ({ genreId }) {
          console.log('movieLookupByGenreId')
          yield `Looking up details for gender...`

          return <MoviesByGenre genreId={genreId} />
        }
      }
    }
  })

  return ui.value
}

export const AI = createAI<any[], React.ReactNode[]>({
  initialUIState: [],
  initialAIState: [],
  actions: {
    submitUserMessage
  }
})
