// FIXME: we might need more precision with delta to be more accurate
// our time might need to be stored in milliseconds or something
const calculateWpm = (typed, deltaSecs) => {
  return ((typed.trim().length / 5) / (deltaSecs / 60)).toFixed(2)
}

module.exports = calculateWpm
