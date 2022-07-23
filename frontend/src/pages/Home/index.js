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
    await fetch(`${API_HOST}/item/`, {
        method: "GET",
        headers: new Headers({
            'Content-type': 'application/json'
        })
    })
    .then(res => res.json)
    .then(response => {
        setData(response.data);
    })
        .catch(err => {
            console.log(err);
        })
}

async function putData(data) {
    await fetch(`${API_HOST}/item/create`, {
        method: "POST",
        headers: new Headers({
            'Content-type': 'application/json'
        }),
        body: JSON.stringify({data})
    })
}

const Home = () => {

    const [data, setData] = useState([]);
    const [sidebarStatus, setSidebarStatus] = useState(false);
    const status = useRef(false);
   
    useEffect(() => {
        if(!status.current)
            return;
        putData(data)
        .then(data => {
            status.current = false;
        })
    }, [data])

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
                        <Edit status={status} setData={setData}/>
                        <hr/>
                        <List status={status} data={data} deleteData={setData}/>
                    </Col>
                    <Col className="g-0"></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;
