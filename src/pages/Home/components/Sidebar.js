import './../index.css';
import { useEffect } from 'react';

const Sidebar = ({sidebarStatus, setSidebarStatus}) => {

    const closeSidebar = async () => {
        setSidebarStatus(false);
    }

    /*
    useEffect(() => {
        if(sidebarStatus === true) {
            document.getElementsByClassName("sidebar-box").style.display = "block";
        } else
            document.getElementsByClassName("sidebar-box").style.display = "none";
    }, [sidebarStatus])
    */

    return (
        <div className="sidebar-box" style={{
                width: sidebarStatus ? '40%' : '0%'
            }}>
            <p className="close-sidebar-btn" onClick={closeSidebar} style={{
                display: sidebarStatus ? 'block' : 'none'
            }}>X</p>
            <a className="sidebar-item" style={{ 
                display: sidebarStatus ? 'block' : 'none'
            }}>LINK ONE</a>
            <a className="sidebar-item" style={{
                display: sidebarStatus ? 'block' : 'none'
            }}>LINK TWO</a>
            <a className="sidebar-item" style={{
                display: sidebarStatus ? 'block' : 'none'
            }}>LINK THREE</a>
            <a className="sidebar-item" style={{
                display: sidebarStatus ? 'block' : 'none'
            }}>LINK FOUR</a>
            <a className="sidebar-item" style={{
                display: sidebarStatus ? 'block' : 'none'
            }}>LINK FIVE</a>
            <a className="sidebar-item" style={{
                display: sidebarStatus ? 'block' : 'none'
            }}>LINK SIX</a>
        </div>
    )
}

export default Sidebar;
