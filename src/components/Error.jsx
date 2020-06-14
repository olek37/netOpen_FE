import React from 'react'
import { Link } from 'react-router-dom'

const Error = ({ message }) => (
  <div className='card container error'>
    <h3>An error has occurred</h3>
    <p>{message}</p>
    <Link to='/'>&#10229; Back to Tournaments</Link>
  </div>
)

export default Error