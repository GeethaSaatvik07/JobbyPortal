import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItemCard from '../JobItemCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPortal extends Component {
  state = {
    jobsList: [],
    searchJob: '',
    salaryAmount: '',
    jobType: [],
    pageStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onChangeJobSearch = event => {
    this.setState({searchJob: event.target.value})
  }

  onClickSearchedJobs = () => {
    this.getJobDetails()
  }

  changeSalaryFilter = event => {
    this.setState({salaryAmount: event.target.value}, this.getJobDetails)
  }

  onChangeCheckBox = id => {
    const checkedJobTypes = employmentTypesList.filter(
      each => each.employmentTypeId === id,
    )

    const filteredTypes = checkedJobTypes.map(each => each.employmentTypeId)
    // console.log(filteredTypes)
    this.setState(
      prevState => ({
        jobType: [...prevState.jobType, filteredTypes],
      }),
      this.getJobDetails,
    )
    // console.log(id)
    // console.log(checkedJobTypes)
  }

  getJobDetails = async () => {
    this.setState({pageStatus: apiStatus.loading})
    const {searchJob, salaryAmount, jobType} = this.state
    const joinedJobTypes = jobType.join(',')
    console.log(joinedJobTypes)
    const jwtToken = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedJobTypes}&minimum_package=${salaryAmount}&search=${searchJob}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const newjobDetails = data.jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        location: each.location,
        jobDescription: each.job_description,
        employmentType: each.employment_type,
        packagePerAnnum: each.package_per_annum,
      }))
      this.setState({jobsList: newjobDetails, pageStatus: apiStatus.success})
    } else {
      this.setState({pageStatus: apiStatus.failure})
    }
  }

  retryJobsList = () => {
    this.getJobDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderEmploymentFilter = () =>
    employmentTypesList.map(each => (
      <ul className="filter-checks" key={each.employmentTypeId}>
        <input
          id={each.employmentTypeId}
          type="checkbox"
          className="filter-checkbox"
          onChange={() => this.onChangeCheckBox(each.employmentTypeId)}
          checked={each.checked}
        />
        <label htmlFor={each.employmentTypeId} className="filter-check-label">
          {each.label}
        </label>
      </ul>
    ))

  renderSalaryFilter = () =>
    salaryRangesList.map(each => (
      <ul className="filter-checks" key={each.salaryRangeId}>
        <input
          id={each.salaryRangeId}
          type="radio"
          className="filter-checkbox"
          name="salary"
          value={each.salaryRangeId}
          onChange={this.changeSalaryFilter}
        />
        <label htmlFor={each.salaryRangeId} className="filter-check-label">
          {each.label}
        </label>
      </ul>
    ))

  renderFiltersSide = () => (
    <div className="profile-filters">
      <Profile />
      <hr className="filters-horizontal-line" />
      <h1 className="filters-headings">Type of Employment</h1>
      {this.renderEmploymentFilter()}
      <hr className="filters-horizontal-line" />
      <h1 className="filters-headings">Salary Range</h1>
      {this.renderSalaryFilter()}
    </div>
  )

  renderNoJobs = () => (
    <div className="no-jobs">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-line">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsList = () => {
    // const {jobsList, jobType} = this.state
    const {jobsList} = this.state
    const jobsCount = jobsList.length
    // console.log(jobType)
    return (
      <>
        {jobsCount === 0 ? (
          this.renderNoJobs()
        ) : (
          <ul className="job-cards-container">
            {jobsList.map(eachJob => (
              <JobItemCard key={eachJob.id} jobCardDetails={eachJob} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderFailureView = () => (
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
        onClick={this.retryJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderAccordingToApiStatus = () => {
    const {pageStatus} = this.state

    switch (pageStatus) {
      case apiStatus.loading:
        return this.renderLoadingView()
      case apiStatus.success:
        return this.renderJobsList()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchJob} = this.state
    // const jobsCount = jobsList.length
    // console.log(jobsList)
    return (
      <div className="jobs-full-page">
        <Header />
        <div className="jobs-page">
          {this.renderFiltersSide()}
          <div className="search-jobslist">
            <div className="input-icon">
              <input
                type="search"
                className="search-jobs"
                placeholder="Search"
                onChange={this.onChangeJobSearch}
                value={searchJob}
              />
              <button
                type="button"
                className="search-job-button"
                data-testid="searchButton"
                onClick={this.onClickSearchedJobs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {/* {jobsCount > 0 ? this.renderJobsList() : this.renderNoJobs()} */}
            {/* {this.renderJobsList()} */}
            {/* <ul className="job-cards-container">
              
            </ul> */}
            {this.renderAccordingToApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPortal
