import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='App'>
      <div className='pokedox-header '>Pokedex</div>
      <Outlet />
    </div>
  )
}

export default Layout
