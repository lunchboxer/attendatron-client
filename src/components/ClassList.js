import React from 'react'
import ClassAdd from './ClassAdd'
import { Link } from 'react-router-dom'

const ClassList = ({ groups }) => {
  return (
    <div>
      <Link to="/">&larr;back to main menu</Link>
      <h2>Classes</h2>

      <ClassAdd />
      <ul className="menu-list">
        {groups ? (
          groups.map(group => (
            <Link to={'/classes/' + group.id} key={group.id}>
              <li>
                20{group.year} {group.major} class &#35;{group.number}
              </li>
            </Link>
          ))
        ) : (
          <li>No classes</li>
        )}
      </ul>
    </div>
  )
}

export default ClassList
