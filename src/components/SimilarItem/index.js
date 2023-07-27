import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {IoMdMail} from 'react-icons/io'
import './index.css'

class SimilarItem extends Component {
  render() {
    const {similarDetails} = this.props
    const {
      title,
      companyLogoUrl,
      location,
      employmentType,
      jobDescription,
      rating,
    } = similarDetails
    return (
      <div className="similar-item">
        <div className="similar-logo-heading">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-image"
          />
          <div className="similar-heading-rating">
            <h1 className="similar-heading">{title}</h1>
            <div className="similar-star-rating">
              <AiFillStar className="similar-star" />
              <p className="similar-rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="similar-description">Description</h1>
        <p className="similar-para">{jobDescription}</p>
        <div className="similar-location-type">
          <div className="similar-location">
            <MdLocationOn className="similar-logo" />
            <p className="similar-location-line">{location}</p>
          </div>
          <div className="similar-location">
            <IoMdMail className="similar-logo" />
            <p className="similar-location-line">{employmentType}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SimilarItem

// id: eachSimilar.id,
//         title: eachSimilar.title,
//         companyLogoUrl: eachSimilar.company_logo_url,
//         location: eachSimilar.location,
//         employmentType: eachSimilar.employment_type,
//         jobDescription: eachSimilar.job_description,
//         rating: eachSimilar.rating,
