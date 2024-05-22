export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface MoviesResponse {
  Response: 'True' | 'False'
  Search: Movie[]
  totalResults: string
}

export interface MoviesErrorResponse {
  Response: 'False'
  Error: string
}
