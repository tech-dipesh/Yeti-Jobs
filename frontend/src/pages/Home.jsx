import React from 'react'
import { Outlet } from 'react-router'

export default function Home() {
  return (
    <div>
      <h1>This is the homepage page.</h1>
      <Outlet/>
    </div>
  )
}
