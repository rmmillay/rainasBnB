import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SpotCard from '../SpotCards/SpotCard';
import { useEffect, useState } from 'react';
import { getSpotsThunk } from '../../store/getSpotsThunk';



const SpotDetail = () => {

    const {id} = useParams();
    const spot = useSelector((state) => state.spotsReducer.byId[id]);
    const dispatch = useDispatch();

    console.log(spot)

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
    

  return (
    <div>
       <SpotCard spot={spot} />
    </div>
  );
}

 
export default SpotDetail;
