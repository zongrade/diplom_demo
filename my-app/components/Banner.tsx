import React, { useState } from 'react'

const Banner = (): React.ReactElement => {
  const [first, setfirst] = useState(1)
  const [second, setsecond] = useState(2)
  console.log('render')
  function buttonHandler() {
    setfirst(2)
    setsecond(1)
  }
  return (
    <div>
      <span>banner smth</span>
      <button onClick={buttonHandler}>click me</button>
    </div>
  )
}

export default Banner
