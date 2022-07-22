import glass from './../public/glass.png';
import info from './../public/info.png';
import { API_GET_DATA } from '../../../global/constants'
import { useState } from 'react';


const Topnav = ({setSidebarStatus}) => {
    
    const [searchStr, setSearchStr] = useState({});
    
    // 會因為跨域問題無法post,但request成功
    const sendSearchRequest = async () => {
        const strObj = {
            'searchStr': document.getElementById("searching-block").value
        }
        setSearchStr(strObj);
        await fetch(API_GET_DATA, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(data => console.log(data));
    }

    const openSidebar = async () => {
        setSidebarStatus(true);
    }

    return (
        <div className="topnav" width="100%">
            <b className="sidebar-btn" onClick={openSidebar}>三</b>
            <span>
                <input id="searching-block" type="search" placeholder="Search..."/>
                <img className="glass-icon" src={glass} alt="glass icon" height="35px"
                     onClick={()=>{sendSearchRequest()}}/>
            </span>
            <img className="info-icon" src={info} alt="info icon" height="30px"/>
        </div>
    )
}

export default Topnav;
