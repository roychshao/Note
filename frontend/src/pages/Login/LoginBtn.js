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

const LoginBtn = () => {
   
    const clientId="962878597221-fisi401jdpudb7d37cv2qb39vc9oduu0.apps.googleusercontent.com"

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS!", res.profileObj);
        document.getElementById("homeLink").click();
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED", res);
    }

    const options: IAuthorizationOptions = {
        clientId: clientId,
        redirectUri: "http://localhost:3000/auth/google/callback",        
        scopes: ["openid", "profile", "email"],
        includeGrantedScopes: true,
        accessType: "offline",
    };

    return (
        <div>
            <GoogleAuth>
                <GoogleAuthConsumer>
                    {({responseState, isAuthenticated}: IOAuthState) => {
                        if(!isAuthenticated) {
                            console.log("not authenticated");
                            return <GoogleButton
                                options={options}
                                apiUrl={`${API_HOST}/auth/google/login`}
                                defaultStyle={true}
                                displayErrors={true}>Login</GoogleButton>;
                        } else {
                            console.log("is authenticated");
                            if(responseState.accessToken) {
                                document.getElementById("homeLink").click();
                                fetch(`${API_HOST}/item/?serverTimeZone=Asia/Shanghai`, {
                                    headers: createOAuthHeaders(),
                                })
                                .then(res => {
                                    console.log("logged in", res);
                                })
                                .catch(err => console.error("Just because you have a gmail account doesn't mean you have access!"))
                            } else {
                                console.log("not logged in");
                            }
                        }
                    }}
                </GoogleAuthConsumer>
            </GoogleAuth>
        </div>
    )

}

export default LoginBtn;
