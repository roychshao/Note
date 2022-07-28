import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { Router, Routes, Route } from 'react-router-dom';
import history from './CreatedHistory';
import reportWebVitals from './reportWebVitals';


// Router部份
export default function pageRouter() {
    return (
        <Router history={history}>
            <Route path="/" exact component={Login}>
                <Route path="home" component={Home}/>
            </Route>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <pageRouter />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
