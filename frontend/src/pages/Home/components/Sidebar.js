import './../index.css';
import { API_HOST } from '../../../global/constants';

const Sidebar = ({sidebarStatus, setSidebarStatus, setData}) => {

    const closeSidebar = async () => {
        setSidebarStatus(false);
    }

    const getDoneNotes = async () => {
        var data = [];
        await fetch(`${API_HOST}/item/done`)
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
            console.log("get done items successfully.");
        }).catch(err => {
            console.log("get done items failed. error: " + err.message);
        })
    }

    const getCollectedNotes = async () => {
        var data = [];
        await fetch(`${API_HOST}/item/collected`)
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
            console.log("get collected items successfully.");
        }).catch(err => {
            console.log("get collected items failed. error: " + err.message);
        })
    }

    return (
        <div className="sidebar-box" style={{
                width: sidebarStatus ? '40%' : '0%'
            }}>
            <p className="close-sidebar-btn" onClick={closeSidebar} style={{
                display: sidebarStatus ? 'block' : 'none'
            }}>X</p>
            <a className="sidebar-item" onClick={getDoneNotes} style={{ 
                display: sidebarStatus ? 'block' : 'none'
            }}>已完成的Note</a>
            <a className="sidebar-item" onClick={getCollectedNotes} style={{
                display: sidebarStatus ? 'block' : 'none'
            }}>珍藏的Note</a>
        </div>
    )
}

export default Sidebar;
