import React from 'react';
import TodoList from '../TodoList';
import {Route, Switch, BrowserRouter as Router, Link} from 'react-router-dom'
import TodoDetails from '../TodoDetails';
import style from './style.module.css';

function Home(props) {
    return (
        <div className={style["container"]}>
            <h1>TO DO LIST</h1>
            <div>
                {/* <Router>
                    <Link to='/todo'><p>To Do List</p></Link>
                </Router> */}
                
                <Router>
                <Switch>
                    <Route exact path="/"></Route>
                    <Route exact path="/todo" component={TodoList}></Route>
                    <Route  path="/todo/:id" component={TodoDetails}></Route>
                </Switch>
                </Router>
                
                {/* <TodoList /> */}
            </div>
        </div>
    );
}

export default Home;