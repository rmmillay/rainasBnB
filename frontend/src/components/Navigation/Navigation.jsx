import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
        <li>
         <NavLink to="spots/create">create a spot</NavLink>
       </li>
       <li>
         <NavLink to="/spots/delete">remove a spot</NavLink>
       </li>
       <li>
         <NavLink to="/spots/edit">edit a spot</NavLink>
       </li>
       <li>
         <NavLink to="/spots/reviews">Reviews</NavLink>
       </li>
       <li>
         <NavLink to="/spots/reviews/create">create Reviews</NavLink>
       </li>
       <li>
         <NavLink to="/spots/reviews/delete">edit Reviews</NavLink>
       </li>
       <li>
         <NavLink to="/spots/reviews/edit">delete Reviews</NavLink>
       </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;