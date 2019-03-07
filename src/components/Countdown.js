import React from 'react'

const Lights = ({ time }) => (
  <div className='lights'>
    <div className={'lights__light' + ((time == 3) ? ' lights__light--active' : '')}></div>
    <div className={'lights__light' + ((time == 2) ? ' lights__light--active' : '')}></div>
    <div className={'lights__light' + ((time <= 1) ? ' lights__light--active' : '')}></div>
  </div>
)

const Countdown = (time) => (
  <div className='countdown'>
    <h2 className='countdown__text'>{ (time > 0) ? 'Race starting in ' + time : 'GO!'}</h2>
    <Lights time={time} />
  </div>
)

export default Countdown
