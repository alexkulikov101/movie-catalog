import { Outlet } from 'react-router-dom'

import './styles.scss'

export const Layout = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  )
}
