import { Link } from 'react-router-dom';
import './index.css';
import LoginBtn from './LoginBtn';

const Login = () => {

    return (
        <div className="login-page">
            <Link to="/home" id="homeLink"></Link>
            <LoginBtn/>
        </div>
    );  
}

export default Login;
