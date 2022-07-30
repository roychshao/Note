import { Link } from 'react-router-dom';
import './index.css';
//import LoginBtn from './LoginBtn';
import { GoogleLogin } from 'react-google-login';

const onSuccess = (response) => {
    console.log("onSuccess:" );
    console.log(response);
    document.getElementById("homeLink").click();
}

const onFailure = (response) => {
    console.log("onFailure: ");
    console.error(response);
}

const clientId="962878597221-fisi401jdpudb7d37cv2qb39vc9oduu0.apps.googleusercontent.com"

const Login = () => {

    return (
        <div className="login-page">
            <Link to="/item" id="homeLink"></Link>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                redirectUri="http://localhost:3000/auth/google/callback"
                scope="profile email"
            />
        </div>
    );  
}

export default Login;
