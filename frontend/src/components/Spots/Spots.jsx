// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk } from '../../store/getSpotsThunk.js';
import './Spots.css';
import SpotCard from "../SpotCards/SpotCard.jsx";
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';



const Spots = () => {

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spots = useSelector((state) => state.spotsReducer.Spots);
  const spotsArr = Object.values(spots)
  // console.log(spots)
  
  const [isLoaded, setIsLoaded] = useState(false);
 

  useEffect(() => {

    const getSpots = async () => {
      await dispatch(getSpotsThunk());
      setIsLoaded(true);
    }

    if(!isLoaded){ 
      getSpots();
    }

  }, [isLoaded, dispatch])


  const goToSpotDetail = (e, spot) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}`)
  }

  if (!isLoaded || !spots) {
    return <h1>Loading...</h1>

  } else {
    return (
      <div>
        <div>
          <h1 className="heading">Welcome To Rainas BnB</h1>
        </div>
        <div className="card-list-container">
        {
          spotsArr.map((spot, idx) => (
            <div className="card-container" 
            key={`${idx}-${spot.id}`}
            onClick={(e)=> goToSpotDetail(e, spot)}>
              <SpotCard spot={spot} />
              {/* {console.log(spot)} */}
            </div>
          ))
        }
        </div> 
      </div>
    );
  }
}

export default Spots;








// function Spot() {
//    const dispatch = useDispatch();
//    const spots = useSelector(state => state.spotsReducer.spots)
//    useEffect(function(){
//      if(!spots){
//         dispatch(allSpots())
//      }
//    })

//    console.log(spots)
//    return (
     
//       <div className="">
//         {spots?.map((ele,idx)=> (
//         <div key={`${spots.id}--${idx}`} className="">
//             {(ele)}
//             <NavLink to={'/'}>
//              <img className="first-img"
//              src={spots.previewImage ? '${spot.previewImage}' : ""}/>
//             </NavLink>
            
//           <div className="">
//              {ele.previewImage}
//         </div> 
//         <div className="">
//             <div className="">
//                 {ele.city}, {ele.state}
//             </div>
//             <div className="">
//                 {ele.avgRating}
//             </div>
//          </div> 
//          <div className="">
//             <div className="">
//                 {ele.price} per night
//             </div>
//          </div>
       
//     )
//    )
//   }
  
  

