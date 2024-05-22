import React, { FC } from 'react'

import './styles.scss'

interface Props {
  children: React.ReactNode
}

export const Header: FC<Props> = ({ children }) => (
  <div className="movies-header">
    <h1>Movie Catalog</h1>
    <div>{children}</div>
    <p>John Doe</p>
  </div>
)
