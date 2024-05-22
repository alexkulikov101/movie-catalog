import { FC } from 'react'

import { Movie } from 'types/Movies'
import { PLACEHOLDER_IMAGE } from 'features/movies/constants'

interface Props {
  movie: Movie
}

export const Card: FC<Props> = ({ movie }) => {
  return (
    <div className="movie-card" key={movie.imdbID}>
      <img
        className="movie-card__poster"
        src={movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMAGE}
        alt={movie.Title}
      />
      <div>
        <p className="movie-card__info-wrap">
          <span>Name:</span>
          <span>{movie.Title}</span>
        </p>
        <p className="movie-card__info-wrap">
          <span>Year:</span>
          <span>{movie.Year}</span>
        </p>
        <p className="movie-card__info-wrap">
          <span>imdbID:</span>
          <span>{movie.imdbID}</span>
        </p>
        <p className="movie-card__info-wrap">
          <span>Type:</span>
          <span>{movie.Type}</span>
        </p>
      </div>
    </div>
  )
}
