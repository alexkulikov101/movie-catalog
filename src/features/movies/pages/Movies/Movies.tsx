import { MoviesErrorResponse } from 'types/Movies'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'lodash/debounce'

import { requestSearchMovies } from 'api/movies'
import { Spinner } from 'components/Spinner'
import { Header } from 'features/movies/components/Header'
import { Pagination } from 'features/movies/components/Pagination'
import { Card } from 'features/movies/components/Card'
import { ITEMS_PER_PAGE } from 'features/movies/constants'
import './styles.scss'

export const Movies = () => {
  const [query, setQuery] = useState<string>('')
  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [finalQuery, setFinalQuery] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)

  const searchMovies = async (searchQuery: string, pageNumber = 1) => {
    setIsLoading(true)
    setFinalQuery(searchQuery)
    try {
      const response = await requestSearchMovies(searchQuery, pageNumber)
      if (response.Response === 'True') {
        setMovies(response.Search)
        setError('')
        setTotalResults(parseInt(response.totalResults, 10))
      } else {
        setMovies([])
        setTotalResults(0)
        setError(
          (response as unknown as MoviesErrorResponse)?.Error ||
            'Something went wrong',
        )
      }
    } catch (error: unknown) {
      setError(
        (error as MoviesErrorResponse)?.Error || 'Failed to fetch movies',
      )
      setMovies([])
      setTotalResults(0)
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearch = useCallback(
    debounce((searchQuery, pageNumber) => {
      searchMovies(searchQuery, pageNumber)
    }, 500),
    [],
  )

  useEffect(() => {
    if (query) {
      debouncedSearch(query, page)
    } else {
      setError('')
      setMovies([])
      setTotalResults(0)
    }
  }, [query, page, debouncedSearch])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <div className="movie-catalog">
      <div>
        <Header>
          <input
            ref={inputRef}
            className="movie-catalog__search-input"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for movies..."
            disabled={isLoading}
          />
        </Header>
      </div>
      {isLoading && <Spinner />}
      {error && <p className="movie-catalog__error-text">{error}</p>}
      {!isLoading && movies.length > 0 && (
        <>
          <p className="movie-catalog__result">
            Your searched for: {finalQuery}, {totalResults} results found
          </p>
          <div className="movie-catalog__cards-wrapper">
            {movies.map((movie) => (
              <Card key={movie.imdbID} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
