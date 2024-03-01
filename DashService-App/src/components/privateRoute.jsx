

import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import HomePage from '../pages/homePage';
import AdminDash from '../pages/adminDash';
import {jwtDecode} from 'jwt-decode';
import AdminPage from '../pages/AdminPage';


function validateJwt(token){
  const payload =  jwtDecode(token);
  return payload;
}

const PrivateHomeRoute = ({ element }) => {

  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;
  const token = cookies.get('token');
  if(!token){
    return<HomePage></HomePage>
  }
  const user = validateJwt(token);
  if (isAuthenticated) {
    
    if(user.role === 'Admin'){
      return <AdminPage></AdminPage>
    }
  } else {
    return <HomePage></HomePage>
  }
  console.log(user)
console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <HomePage />;
};

const PrivateLoginRoute = ({ element }) => {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;

  return isAuthenticated ? <Navigate to="/" replace /> :<Outlet /> ;
};

export {PrivateHomeRoute,PrivateLoginRoute};
