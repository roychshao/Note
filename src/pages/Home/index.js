import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topnav from './components/Topnav';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import Edit from './components/Edit';
import List from './components/List';
import { API_GET_DATA } from '../../global/constants'

async function getData(setData) {
    const res = await fetch(API_GET_DATA);
    const { data } = await res.json();
    setData(data);
}

async function putData(data) {
    await fetch(API_GET_DATA, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({data})
    })
}

const Home = () => {

    const [data, setData] = useState([]);
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
            paddingRight: "0px"
        }
    }

    return (
        <div style={styles.div}>
            <Topnav/>
            <Container fluid style={styles.container}>
                <Row>
                    <Col className="g-0"></Col>
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
