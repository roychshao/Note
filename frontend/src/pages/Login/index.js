import { Link } from 'react-router-dom';
import './index.css';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

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
    
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: "profile email"
            })
        }
    }, [])

    return (
        <div className="login-page">
            <Link to="/item" id="homeLink">home</Link>
            <GoogleLogin
                clientId={clientId}
                scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
                uxMode='redirect'
                redirectUri="http://localhost:3000/auth/google/callback"
            />
        </div>
    );  
}

export default Login;
