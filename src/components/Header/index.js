import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="nav-header">
        <Link to="/" className="nav-links">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>
        <ul className="nav-home-jobs">
          <div className="nav-home-jobs-side">
            <Link to="/" className="nav-links">
              <li className="nav-pages">Home</li>
            </Link>
            <Link to="/jobs" className="nav-links">
              <li className="nav-pages">Jobs</li>
            </Link>
          </div>
          <li className="nav-list-button">
            <button
              type="button"
              className="nav-logout-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Header)
