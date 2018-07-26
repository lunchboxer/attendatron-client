import React from 'react'
import { Link } from 'react-router-dom'

const HomeMenu = () => {
  return (
    <div>
      <h2>Main menu</h2>
      <p>Select an item to view/edit.</p>
      <ul className="menu-list">
        <Link to="/classes">
          <li>Classes and students</li>
        </Link>
        <Link to="/courses">
          <li>Courses</li>
        </Link>
      </ul>
    </div>
  )
}

export default HomeMenu
