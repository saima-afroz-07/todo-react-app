import React from 'react';
import TodoList from '../TodoList';
import {Route, Switch, BrowserRouter as Router, Link} from 'react-router-dom'
import style from './style.module.css';
import { Container } from 'react-bootstrap';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import PrivateRouter from '../PrivateRouter/PrivateRouter';

function Home(props) {
    console.log('home page')
    return (<>
        
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Router>
                    <>
                        <Switch>
                            <PrivateRouter exact path="/todo" component={TodoList}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/login" component={Login}/>
                        </Switch>
                    </>
                </Router>
            </div>
        </Container>
        </>
    );
}

export default Home;