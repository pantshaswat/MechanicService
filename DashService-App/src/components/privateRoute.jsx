
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import HomePage from '../pages/homePage';
const PrivateHomeRoute = ({ element }) => {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;

  return isAuthenticated ? <Outlet /> : <HomePage />;
};

const PrivateLoginRoute = ({ element }) => {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;

  return isAuthenticated ? <Navigate to="/" replace /> :<Outlet /> ;
};

export {PrivateHomeRoute,PrivateLoginRoute};
