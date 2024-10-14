import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
  const navigate = useNavigate()
  const goHome = ()=>{
    navigate('/')
  }

  return (
    <div>
      <h1>Go back to the homepage dumbasss</h1>
      <button onClick={goHome}>Go Home</button>
    </div>
  )
}

export default Error404
