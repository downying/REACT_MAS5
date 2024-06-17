import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
        <h1>About</h1>
        <Link to="/about"> About 으로 이동</Link>
    </>
  )
}

export default Home