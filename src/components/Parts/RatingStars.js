import React from 'react'
import { Rating, RoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css';
import Mstyles from '/Styles/library.module.css'
const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
}


const RatingStars = ({ Stars }) => {
    return (
        <div className={Mstyles.RatingStarBox}>
            <div className={Mstyles.RatingStarBoxA}>
                <Rating className={Mstyles.RatingStar} readOnly value={Stars} halfFillMode='svg' itemStyles={myStyles} />
            </div>
            <div className={Mstyles.RatingStarBoxB}>
                <small> {Stars} Stars</small>
            </div>
        </div>

    )
}

export default RatingStars
