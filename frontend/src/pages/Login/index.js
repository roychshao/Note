import { Link } from 'react-router-dom';
import './index.css';
import { GoogleLogin } from 'react-google-login';


const clientId="962878597221-fisi401jdpudb7d37cv2qb39vc9oduu0.apps.googleusercontent.com"

const onSuccess = (response) => {
    console.log("onSuccess:" );
    console.log(response);
}

const onFailure = (response) => {
    console.log("onFailure: ");
    console.error(response);
}

const Login = () => {
    return (
        <div className="login-page">
            <Link to="/item" id="homeLink"></Link>
            <div className="wrapper">
                <GoogleLogin
                    clientId={clientId}
                    scope="email profile"
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                    uxMode='redirect'
                    redirectUri="http://localhost:3000/auth/google/callback"
                />
            </div>
        </div>
    );  
}

export default Login;
