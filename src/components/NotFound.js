import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <Link to="/">&larr;back to main menu</Link>
      <h2>Not Found</h2>
      <p>The page or resource your were looking for was not found</p>
    </div>
  )
}

export default NotFound
