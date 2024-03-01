
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';

export default function UserDashPage(){
    const cookies = new Cookies();
    const navigate = useNavigate();

const handleLogOut = ()=>{
    cookies.remove('token');
    navigate('/login');
}
   return (<>
    <div>
        This is user dash
    </div>
    <button onClick={handleLogOut}>
            Logout
        </button>
    </>)
}