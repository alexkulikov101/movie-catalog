import { MoviesResponse } from 'types/Movies'
import { api } from '.'

export const requestSearchMovies = async (
  searchTerm: string,
  page: number = 1,
): Promise<MoviesResponse> => {
  const url = `https://www.omdbapi.com/?i=tt3896198&s=${encodeURIComponent(searchTerm)}&page=${page}&apikey=${import.meta.env.VITE_OMDB_KEY}`
  const response = await api.get(url)
  return response.data
}
