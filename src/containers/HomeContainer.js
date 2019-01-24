import { connect } from 'react-redux'
import Home from '../components/Home'

const mapStateToProps = ({authentication: { isLoggedIn }}) => ({
  isLoggedIn
})

export default connect(mapStateToProps)(Home)
