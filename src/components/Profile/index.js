import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {profileDetails: {}, profileStatus: apiStatus.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    // console.log(data)
    // console.log(data.profile_details)
    if (response.ok) {
      const newProfileDetails = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: newProfileDetails,
        profileStatus: apiStatus.success,
      })
    } else {
      this.setState({profileStatus: apiStatus.failure})
    }
  }

  retryProfile = () => {
    this.getProfileDetails()
  }

  renderSuccessProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureProfile = () => (
    <div className="profile-loading-retry">
      <button
        className="profile-retry-button"
        type="button"
        onClick={this.retryProfile}
      >
        Retry
      </button>
    </div>
  )

  renderLoadngProfile = () => (
    <div
      className="loader-container profile-loading-retry"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileWithApiStatus = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case apiStatus.loading:
        return this.renderLoadngProfile()
      case apiStatus.success:
        return this.renderSuccessProfile()
      case apiStatus.failure:
        return this.renderFailureProfile()
      default:
        return null
    }
  }

  render() {
    // const {profileDetails} = this.state
    // const {profileImageUrl, name, shortBio} = profileDetails
    // console.log(profileDetails)
    return (
      //   <div className="profile-card">
      //     <img src={profileImageUrl} alt="profile" className="profile-image" />
      //     <h1 className="profile-name">{name}</h1>
      //     <p className="profile-bio">{shortBio}</p>
      //   </div>
      <>{this.renderProfileWithApiStatus()}</>
    )
  }
}

export default Profile
