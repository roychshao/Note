import { Link } from 'react-router-dom';
import './index.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId="962878597221-fisi401jdpudb7d37cv2qb39vc9oduu0.apps.googleusercontent.com"

const onSuccess = async (response) => {
    console.log("onSuccess: ");
    console.log(response);
    document.getElementById("homeLink").click();
}

const onError = (response) => {
    console.log("onFailure: ");
    console.error(response);
}

const Login = () => {

    return (
        <div className="login-page">
            <Link to="/item" id="homeLink"></Link>
            <div className="wrapper">
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        ux_mode="redirect"
                        redirect_uri="http://localhost:3000/"
                        scope="email profile"
                        login_uri="http://localhost:3000/auth/google/login"
                        onSuccess={onSuccess}
                        onError={onError}
                        theme="filled_blue"
                        size="large"
                    />
                </GoogleOAuthProvider>
            </div>
        </div>
    );  
}

export default Login;
