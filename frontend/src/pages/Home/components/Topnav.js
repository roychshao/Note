import glass from './../public/glass.png';
import info from './../public/info.png';
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../global/constants';
import { API_HOST } from '../../../global/constants';
import { useState } from 'react';


const Topnav = ({setSidebarStatus, setData, setCancelSearch}) => {
    
    const [searchStr, setSearchStr] = useState("");

    //獲取搜尋資料
    const sendSearchRequest = async () => {
        var data = [];
        const searchStr = document.getElementById("searching-block").value;
        setSearchStr(searchStr);
        await fetch(`${API_HOST}/item/search?search_str=${searchStr}`)
        .then(res => res.json())
        .then(res => {
            console.log(res.data);
            data = res.data;
            data.map(item => {
                item.date = item.date.slice(0,10);
                item.time = item.time.slice(0,5);
                return item;
            })
            data.sort(function(a,b) {
                return new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time);
            })
            setData(data);
            console.log("get searched items successfully.");
        }).catch(err => {
            console.log("get searched items failed. error: " + err.message);
        })
    }

    const loginSuccess = (res) => {
        console.log("[Login success]", res.profileObj);
    }

    const loginFailed = (res) => {
        console.log(GOOGLE_CLIENT_ID);
        console.log("[Login failed]", res);
    }

    const openSidebar = async () => {
        setSidebarStatus(true);
    }

    return (
        <div className="topnav" width="100%">
            <b className="sidebar-btn" onClick={openSidebar}>三</b>
            <input id="searching-block" type="search" placeholder="Search..."/>
            <img className="glass-icon" src={glass} alt="glass icon" height="30px"
                 onClick={()=>{sendSearchRequest()}}/>
            <p onClick={()=>{setCancelSearch(function(prev) {
                console.log(prev);
                return prev * -1;
                })}}>C</p>
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="LOGIN"
                buttonText=""
                onSuccess={loginSuccess}
                onFailure={loginFailed}
                redirectUri={`${API_HOST}/auth/google/login`}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

                /*<img className="info-icon" src={info} alt="info icon" height="30px"/>*/
export default Topnav;
