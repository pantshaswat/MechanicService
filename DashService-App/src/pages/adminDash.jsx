import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';

export default function AdminDash(){
        const cookies = new Cookies();
        const navigate = useNavigate();
    
    const handleLogOut = ()=>{
        cookies.remove('token');
        navigate('/login');
    }
    return(
        <>
        <div>
            This is admin dash
        </div>
        <button onClick={handleLogOut}>
            Logout
        </button>
        </>
    )
}