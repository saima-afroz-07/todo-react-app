import React from 'react';
import TodoList from '../TodoList';
import {Route, Switch, BrowserRouter as Router, Link} from 'react-router-dom'
import TodoDetails from '../TodoDetails';
import style from './style.module.css';
import { Container } from 'react-bootstrap';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import PrivateRouter from '../PrivateRouter/PrivateRouter';

function Home(props) {
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
        
        
        
            {/* <div className={style["container"]}>
                
                <Router>
                    <Link exact to='/todo'><p>To Do List</p></Link>
                </Router>
                <div>
                    <Router>
                    <Switch>
                        <Route exact path="/"></Route>
                        <Route exact path="/todo" component={TodoList}></Route>
                        <Route  path="/todo/:id" component={TodoDetails}></Route>
                    </Switch>
                    </Router>
                </div>
            </div> */}
        </>
    );
}

export default Home;