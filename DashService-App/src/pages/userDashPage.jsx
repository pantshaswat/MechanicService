
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function UserDashPage(){
    const cookies = new Cookies();
    const navigate = useNavigate();

const handleLogOut = ()=>{
    cookies.remove('token');
    navigate('/login');
}
   return (<>
    <div>
        <Navbar></Navbar>
        This is user dash
    </div>
    <button onClick={handleLogOut}>
            Logout
        </button>
    </>)
}