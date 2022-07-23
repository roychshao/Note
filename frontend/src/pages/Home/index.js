import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topnav from './components/Topnav';
import Sidebar from './components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import Edit from './components/Edit';
import List from './components/List';
import { API_HOST } from '../../global/constants'

async function getData(setData) {
    const res = await fetch(`${API_HOST}/item/`)
    .then(result => {
        console.log("get items successfully.");
    }).catch(err => {
        console.log("get items failed.");
    })
    const { data } = await res.json();
    setData(data);
}

async function putData(obj, operation) {
    const res = await fetch(`${API_HOST}/item/${operation}/`, {
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
        getData(setData);
    }, [])

    const styles = {
        container: {
            paddingLeft: "0px",
            paddingRight: "0px",
            marginLeft: "0px",
            marginRight: "0px"
        },
        row: {
            width: "100%"
        }
    }

    return (
        <div style={styles.div}>
            <Topnav setSidebarStatus={setSidebarStatus}/>
            <Container fluid style={styles.container} className="container">
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
