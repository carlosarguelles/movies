import { Movie } from './Movie'

export interface PopularMovies {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
