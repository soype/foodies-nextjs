import React from 'react'

const MealPage = ({params}) => {
  return (
    <main>
        <h1>{params.slug}</h1>
    </main>
  )
}

export default MealPage