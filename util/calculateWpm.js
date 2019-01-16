const calculateWpm = (typed, deltaMs) => {
  return ((typed.trim().length / 5) / (deltaMs / 1000 / 60)).toFixed(2)
}

module.exports = calculateWpm
