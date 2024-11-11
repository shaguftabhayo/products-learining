import React from 'react'
import PrimarySearchAppBar from '../Header/header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <PrimarySearchAppBar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout
