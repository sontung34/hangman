import React from 'react'

function Hint({handleHint, hint, translatedWord}) {
  return (
    <div>
      <button onClick={handleHint} className='hint--button'>{hint? 'Hide' : 'Show'} hint</button>
      {hint && <p>This word means '{translatedWord}' in English</p>}
    </div>
  )
}

export default Hint
