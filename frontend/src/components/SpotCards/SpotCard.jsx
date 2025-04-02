// import React from "react"; 
import { NavLink } from "react-router-dom";
import '../Spots/Spots.css'; 
import './SpotCard.css';



const SpotCard = ({spot}) => {
  // console.log(spot) 

    if(spot && spot.previewImage){
  
  return ( 
    <div className="card-container"> 
      <div>
        <NavLink to={'/spots/:id'} />
      </div>
      <div className="spotImage-container">
        <img className="spotImage" src={spot.previewImage} />
      </div>
      {/* <h1>{spot.address}</h1> */}

      <div className="info-container">
        <div className="top-container spot-text">
          <span>{`${spot.city}, ${spot.state}`}</span>
          <span>{`${spot.avgRating}`}</span>
        </div>
        <div className="middle-container">
          <p className="spot-text">{spot.name}</p>
          <p className="spot-text">Mar 31 - Apr 5</p>
        </div>
        <div className="bottom-container">
          <span className="spot-text spot-price">{`$${spot.price}`}</span>
          <span className="spot-text">night</span>
        </div>
      </div>
    </div>
  );
}}

export default SpotCard;



