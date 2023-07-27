import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {IoMdMail} from 'react-icons/io'
import {Link} from 'react-router-dom'

import './index.css'

const JobItemCard = props => {
  const {jobCardDetails} = props
  const {
    id,
    title,
    rating,
    companyLogoUrl,
    location,
    jobDescription,
    employmentType,
    packagePerAnnum,
  } = jobCardDetails
  return (
    <Link to={`/jobs/${id}`} className="job-item-card">
      <div className="company-position-rating">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="company-logo-card"
        />
        <div className="position-rating">
          <h1 className="position-card">{title}</h1>
          <div className="star-rating-card">
            <AiFillStar className="star-card" />
            <p className="rating-card">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-type-salary">
        <div className="location-type">
          <div className="location-card">
            <MdLocationOn className="location-icon-card" />
            <p className="location-name-card">{location}</p>
          </div>
          <div className="location-card">
            <IoMdMail className="location-icon-card" />
            <p className="location-name-card">{employmentType}</p>
          </div>
        </div>
        <p className="location-name-card">{packagePerAnnum}</p>
      </div>
      <hr className="item-card-line" />
      <h1 className="item-desc-heading">Description</h1>
      <p className="item-desc-para">{jobDescription}</p>
    </Link>
  )
}

export default JobItemCard

// {
//     "id": "bb95e51b-b1b2-4d97-bee4-1d5ec2b96751",
//     "title": "Devops Engineer",
//     "rating": 4,
//     "companyLogoUrl": "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
//     "location": "Delhi",
//     "jobDescription": "We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev partners to minimize/avoid any production outages. The role will focus on production support.",
//     "employmentType": "Internship",
//     "packagePerAnnum": "10 LPA"
// }
