// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from '../../store/getSpotsThunk.js';
import SpotCard from "../SpotCards/SpotCard.jsx";
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';



const Reviews = () => {

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviews = useSelector((state) => state.reviewsReducer.Reviews);
  const reviewssArr = Object.values(reviews)
  // console.log(reviews)
  
  const [isLoaded, setIsLoaded] = useState(false);
 

  useEffect(() => {

    const getReviews = async () => {
      await dispatch(getReviewsThunk());
      setIsLoaded(true);
    }

    if(!isLoaded){ 
      getReviews();
    }

  }, [isLoaded, dispatch])


  const goToReviews = (e, reviews) => {
    e.preventDefault();
    navigate(`/spots/:id/${review.id}`)
  }

  if (!isLoaded || !reviews) {
    return <h1>Loading...</h1>

  } else {
    return (
      <div>
        <div>
          <h1 className="heading">Spot Reviews</h1>
        </div>
        <div className="card-list-container">
        {
          reviewsArr.map((review, idx) => (
            <div className="card-container" 
            key={`${idx}-${review.id}`}
            onClick={(e)=> goToReviews(e, review)}>
              <SpotCard review={review} />
              {/* {console.log(review)} */}
            </div>
          ))
        }
        </div> 
      </div>
    );
  }
}

export default Reviews;







