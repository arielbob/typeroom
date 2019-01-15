const calculateWpm = (typed, deltaSecs) => {
  return (typed.trim().length / 5) / (deltaSecs / 60)
}

export default calculateWpm
