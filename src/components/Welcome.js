import React from 'react'
import CreateRoomButton from '../containers/CreateRoomButton'

const Welcome = () => {
  return (
    <section className='welcome'>
      <h1 className='welcome__greeting'>Welcome to <span className='welcome__name'>TypeRoom.</span></h1>
      <h2 className='welcome__tagline'>Race your friends and become a better typist.</h2>
      <CreateRoomButton className='home__create-room'/>
    </section>
  )
}

export default Welcome
