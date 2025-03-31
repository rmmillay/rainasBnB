import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from './components/Navigation';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import LoginFormModal from './components/LoginFormModal/LoginFormModal';
import SignupFormModal from './components/SignupFormModal/SignupFormModal';
import Spots from './components/Spots';
import SpotDetail from './components/SpotDetail/SpotDetail';
import CreateSpot from './components/CreateSpot/CreateSpot';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />,
      },
      {
        path: 'login',
        element: <LoginFormModal />,
      },
      {
        path: 'signup', 
        element: <SignupFormModal />,
      },
      {
        path: '/spots/:id',
        element: <SpotDetail/>,
      },
      {
        path: '/spots/create',
        element: <CreateSpot/>,
      },
    ],
  },
]);


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}



function App() {
  return <RouterProvider router={router} />;
}

export default App;