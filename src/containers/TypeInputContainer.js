import { connect } from 'react-redux'
import TypeInput from '../components/TypeInput'
import { setInputValue } from '../actions'

const mapStateToProps = ({ inputValue }) => ({
  value: inputValue
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (value) => {
    dispatch(setInputValue(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TypeInput)
