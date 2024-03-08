
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard';
import ShopCart from '../components/shopCart';
import PartsPage from './shop/PartsPage';

export default function UserDashPage(){
    const cookies = new Cookies();
    const navigate = useNavigate();

const handleLogOut = ()=>{
    cookies.remove('token');
    navigate('/login');
}
   return (<>
    <div>
           <PartsPage/>
          {/* <ShopCart/> */}
           
    </div>
    <button onClick={handleLogOut}>
            Logout
        </button>
    </>)
}