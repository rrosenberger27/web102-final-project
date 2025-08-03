import React from 'react'
import '../styles/ExampleColorCard.css'

const ExampleColorCard = ({ backgroundColor, textColor }) => {
  return (
    <div className='example-color-card' style={{ backgroundColor: backgroundColor, color: textColor }}>
        <h1>Example Color Card</h1>
        <p> This is an example color card for you to evaluate the color scheme.</p>
    </div>
  )
}

export default ExampleColorCard