import { connect } from 'react-redux'
import Login from '../components/Login'

const mapDispatchToProps = (dispatch) => ({
  success: (user) => {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user }
    })
  }
})

export default connect(null, mapDispatchToProps)(Login)
