import { connect } from 'react-redux'
import Register from '../components/Register'
import { success } from '../actions/loginActions'

const mapDispatchToProps = (dispatch) => ({
  success: (user) => {
    dispatch(success(user))
  }
})

export default connect(null, mapDispatchToProps)(Register)
