import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {IoMdMail} from 'react-icons/io'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import SimilarItem from '../SimilarItem'
import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobFullDetails extends Component {
  state = {
    jobDetails: [],
    similarJobsList: [],
    detailsStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobFullDetails()
  }

  getJobFullDetails = async () => {
    this.setState({detailsStatus: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      const newDetails = {
        id: data.job_details.id,
        title: data.job_details.title,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        rating: data.job_details.rating,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        jobDescription: data.job_details.job_description,
        employmentType: data.job_details.employment_type,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        skills: data.job_details.skills.map(eachSkill => ({
          skillImageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
      }
      //   const newDetails = [data.job_details].map(each => ({
      //     id: each.id,
      //     title: each.title,
      //     companyLogoUrl: each.company_logo_url,
      //     companyWebsiteUrl: each.company_website_url,
      //     rating: each.rating,
      //     location: each.location,
      //     packagePerAnnum: each.package_per_annum,
      //     jobDescription: each.job_description,
      //     employmentType: each.employment_type,
      //     lifeAtCompany: {
      //       description: each.life_at_company.description,
      //       imageUrl: each.life_at_company.image_url,
      //     },
      //     skills: each.skills.map(eachSkill => ({
      //       imageUrl: eachSkill.image_url,
      //       name: eachSkill.name,
      //     })),
      //   }))
      const newSimilarJobs = data.similar_jobs.map(eachSimilar => ({
        id: eachSimilar.id,
        title: eachSimilar.title,
        companyLogoUrl: eachSimilar.company_logo_url,
        location: eachSimilar.location,
        employmentType: eachSimilar.employment_type,
        jobDescription: eachSimilar.job_description,
        rating: eachSimilar.rating,
      }))
      this.setState({
        jobDetails: newDetails,
        similarJobsList: newSimilarJobs,
        detailsStatus: apiStatus.success,
      })
    } else {
      this.setState({detailsStatus: apiStatus.failure})
    }
  }

  retryJobDetails = () => {
    this.getJobFullDetails()
  }

  renderSkills = each => (
    <li className="skill-set">
      <img src={each.imageUrl} alt={each.name} className="skill-image" />
      <p className="skill-name">{each.name}</p>
    </li>
  )

  renderDetailsFailureView = () => (
    <div className="failure-page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-line">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.retryJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderDetailsSuccessView = () => {
    const {jobDetails, similarJobsList} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      location,
      packagePerAnnum,
      jobDescription,
      employmentType,
      skills,
      lifeAtCompany,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <div className="job-details-card">
          <div className="company-position-rating-details">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-card-details"
            />
            <div className="position-rating">
              <h1 className="position-details">{title}</h1>
              <div className="star-rating-details">
                <AiFillStar className="star-details" />
                <p className="rating-details">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-salary-details">
            <div className="location-type-details">
              <div className="location-details">
                <MdLocationOn className="location-icon-details" />
                <p className="location-name-details">{location}</p>
              </div>
              <div className="location-details">
                <IoMdMail className="location-icon-details" />
                <p className="location-name-details">{employmentType}</p>
              </div>
            </div>
            <p className="location-name-details">{packagePerAnnum}</p>
          </div>
          <hr className="item-details-line" />
          <div className="description-visit">
            <h1 className="item-desc-heading-details">Description</h1>
            <div className="visit-link-icon">
              <a
                href={companyWebsiteUrl}
                className="visit-link"
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
              <BiLinkExternal className="new-tab-icon" />
            </div>
          </div>
          <p className="item-desc-para-details">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <div className="skill-set" key={each.name}>
                <img
                  src={each.skillImageUrl}
                  alt={each.name}
                  className="skill-image"
                />
                <p className="skill-name">{each.name}</p>
              </div>
            ))}
          </ul>
          <h1 className="skill-heading">Life at Company</h1>
          <div className="life-company">
            <p className="life-para">{description}</p>
            <img src={imageUrl} alt="life at company" className="life-image" />
          </div>
        </div>
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsList.map(each => (
            <SimilarItem key={each.id} similarDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  renderDetailsLoadingView = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderJobDetailsAccordingToApiStatus = () => {
    const {detailsStatus} = this.state

    switch (detailsStatus) {
      case apiStatus.loading:
        return this.renderDetailsLoadingView()
      case apiStatus.success:
        return this.renderDetailsSuccessView()
      case apiStatus.failure:
        return this.renderDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-page">
          {this.renderJobDetailsAccordingToApiStatus()}
        </div>
      </>
    )
  }
}

export default JobFullDetails
