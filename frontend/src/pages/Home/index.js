import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topnav from './components/Topnav';
import Sidebar from './components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import Edit from './components/Edit';
import List from './components/List';
import Login from './../Login';
import { API_HOST } from '../../global/constants'

async function getData() {
    var data = [];
    await fetch(`${API_HOST}/item/?serverTimeZone=Asia/Shanghai`)
    .then(res => {
        return res.json();
    }).then(res => {
        console.log(res.data);
        data = res.data;
        data.map(item => {
            item.date = item.date.slice(0,10);
            item.time = item.time.slice(0,5);
            return item;
        })
        console.log(data[0].date + " " + data[0].time);
         data.sort(function(a,b) {
            return new Date(a.date+ " " + a.time) - new Date(b.date + " " + b.time);
        })
        console.log("get items successfully.");
    }).catch(err => {
        console.log("get items failed. error: " + err.message);
    })
    return data;
}

async function putData(obj, operation) {
    await fetch(`${API_HOST}/item/${operation}/`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(result => {
        console.log(`${operation} item successfully.`);
    }).catch(err => {
        console.log(`${operation} item failed.`);
    })
}

const Home = () => {

    const [data, setData] = useState([]);
    const [obj, setObj] = useState({});
    const [sidebarStatus, setSidebarStatus] = useState(false);
    const [cancelSearch, setCancelSearch] = useState(1);
    const renderStatus = useRef(0);

    useEffect(() => {
        if(renderStatus.current > 0) {
            if(renderStatus.current === 1) {
                console.log(obj.id, obj.title, obj.description, obj.date, obj.time);
                putData(obj, 'create');
            } else if(renderStatus.current === 2) {
                console.log(obj.id);
                putData(obj, 'delete');
            }
            renderStatus.current = 0;
        }
    }, [obj])
    
    useEffect(() => {
        console.log("trigger useEffect");
        getData()
            .then(data => {
                console.log("data: " + data);
                setData(data);
            })
    }, [cancelSearch])

    const styles = {
        container: {
            paddingLeft: "0px",
            paddingRight: "0px",
            marginLeft: "0px",
            marginRight: "0px"
        },
        row: {
            width: "100%",
            margin: "0px"
        }
    }

    return (
        <div style={styles.div}>
            <Topnav setSidebarStatus={setSidebarStatus} setData={setData} setCancelSearch={setCancelSearch}/>
            <Container fluid style={styles.container}>
                <Row style={styles.row}>
                    <Col className="g-0">
                        <Sidebar sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus}/>
                    </Col>
                    <Col xs={10} className="g-0">
                        <h1 className="title">TO DO LIST</h1>
                        <Edit setData={setData} renderStatus={renderStatus} setObj={setObj}/>
                        <hr/>
                        <List data={data} setData={setData} renderStatus={renderStatus} setObj={setObj}/>
                    </Col>
                    <Col className="g-0"></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;
