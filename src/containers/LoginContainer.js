import { connect } from 'react-redux'
import Login from '../components/Login'
import { success } from '../actions/loginActions'

const mapDispatchToProps = (dispatch) => ({
  success: (user) => {
    dispatch(success(user))
  }
})

export default connect(null, mapDispatchToProps)(Login)
