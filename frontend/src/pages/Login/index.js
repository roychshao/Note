import {
    GoogleButton,
    IAuthorizationOptions,
    isLoggedIn,
    createOAuthHeaders,
    logOutOAuthUser,
    GoogleAuth,
    GoogleAuthConsumer,
    IOAuthState
} from "react-google-oauth2";
import { API_HOST } from './../../global/constants';
import history from '../../CreatedHistory';
import './index.css';

const Login = () => {

    const options: IAuthorizationOptions = {
        clientId: "962878597221-fisi401jdpudb7d37cv2qb39vc9oduu0.apps.googleusercontent.com",
        redirectUri: "http://localhost:3000/auth/google/callback",        
        scopes: ["openid", "profile", "email"],
        includeGrantedScopes: true,
        accessType: "offline",
    };

    function redirectHome() {
        alert("logged in!");
        history.push('/home');
    }

    return (
        <div className="login-page">
            <GoogleAuth>
                <GoogleAuthConsumer>
                    {({responseState, isAuthenticated}: IOAuthState) => {
                        if(!isAuthenticated) {
                            console.log("is authenticated");
                            redirectHome();
                            return <GoogleButton
                                options={options}
                                apiUrl={`${API_HOST}/auth/google/login`}
                                defaultStyle={true}
                                displayErrors={true}>Login</GoogleButton>;
                        } else {
                            console.log("not authenticated");
                            if(isLoggedIn()) {
                                console.log("accessToken");
                                fetch(`${API_HOST}/auth/google/login`, {
                                    headers: createOAuthHeaders(),
                                })
                                .then(data => {
                                    console.log("Logged In!");
                                })
                                .catch(err => console.error("Just because you have a gmail account doesn't mean you have access!"))
                            }
                        }
                    }}
                </GoogleAuthConsumer>
            </GoogleAuth>
        </div>
    );  
}

export default Login;
