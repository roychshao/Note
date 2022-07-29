import { Link } from 'react-router-dom';
import './index.css';
import LoginBtn from './LoginBtn';


const onSuccess = (response) => {
    console.log(response);
    document.getElementById("homeLink").click();
}
const onFailure = response => console.error(response);
const clientId="962878597221-fisi401jdpudb7d37cv2qb39vc9oduu0.apps.googleusercontent.com"

const Login = () => {

    return (
        <div className="login-page">
            <Link to="/home" id="homeLink"></Link>
            <LoginBtn/>
        </div>
    );  
}

export default Login;
