import React from 'react'

function Keyboard({array, wrongLetters}) {
  return (
    <div className='word'>
      {array.map((letter,i) => {
        return (
            <span key={i}>
                {wrongLetters.includes(letter)? '':{letter}}
            </span>
        )
      })
      
      
      }
    </div>
  )
}

export default Keyboard
