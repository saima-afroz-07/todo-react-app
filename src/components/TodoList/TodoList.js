import React, { useState, useEffect } from 'react';
import Todo from '../Todo';
import TodoForm from '../TodoForm';
import {databaseRef} from '../../Config/Config';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import style from './style.module.css';
import setupRootStore from '../../models/Setup';
import {observer} from 'mobx-react-lite'


function TodoList(props) {
    const [list, setList] = useState([]);
    const [priority, setPriority] = useState('all');
    const [editableItem, setEditableItem] = useState(null);
    const savedList = [];
    const {currentUser, logout} = useAuth();
    const [error, setError] = useState(false);
    const history = useHistory();
    const {rootTree} = setupRootStore();
    // const todos = rootTree.todos
    // console.log(rootTree.todos);

    const addTodoList = (todo) => {
        
        if(todo.text === ''){
            alert('Please Fill the tect field')
        } else {
        //    const newTodo = [...list, todo];
           
        //    setList(rootTree.todos);
           databaseRef.collection('todos').doc(currentUser?.uid).collection('userTodo').doc(todo.id).set(todo).then(() => {
                rootTree.addNewTodo(todo);
                console.log('Succesfully Data Added');
            }).catch((err) =>{
                console.log('Error in adding data ', err);
            })
        }
    } 
    //parameters - text, id
    //find method with id to get the todo from list
    // onUpdate function
    const onUpdate = (text, item)  => {
        debugger
        let filteredList = rootTree.todos.map((each_list) => { 
            if(item.id === each_list.id){
                // each_list.text = text;
                setEditableItem(item);

                databaseRef.collection('todos').doc(currentUser?.uid).collection('userTodo').doc(item.id).update({
                    text: text
                }).then(() => {
                    item.onUpdate(text)
                    console.log('Succesfully Data Updated')
                }).catch((err) =>{
                    console.log('Error in updating data ', err)
                })
            }
            return each_list
        })
        
        
        console.log(item.id, text, filteredList);
        // setList(filteredList);
        
    }

    const deleteTodo = (id) => {
        // const deleteTodo = rootTree.todos.filter(todo => todo.id !== id)
        // console.log(deleteTodo);
        // setList(deleteTodo);
        let updatedTodos = rootTree.todos.map(item => {
            if(item.id === id){
                item.deleteTodo();

                databaseRef.collection('todos').doc(currentUser?.uid).collection('userTodo').doc(id).delete().then(() => {
                    console.log('Succesfully Data Deleted')
                }).catch((err) =>{
                    console.log('Error in deleting data ', err)
                })
            }
            return item
        })


        
        
    }

    const fetchTodos =  async () => {

        const response = databaseRef.collection('todos').doc(currentUser?.uid).collection('userTodo');
        const data = await response.get().then((list) => {
            list.forEach(item => {
                savedList.push(item.data())
            })
            rootTree.setTodos(savedList);
            }).catch((err) => {
                console.log('Error in getting data ', err)
            })
        // setList(rootTree.todos);
        
        console.log(savedList, rootTree.todos);
    }

    useEffect(() => {
        fetchTodos();
       
    }, [currentUser, rootTree]);


    const completeTodo = (id) => {
        let updatedTodos = list.map(item => {
            if(item.id === id){
                item.isComplete = !item.isComplete

                databaseRef.collection('todos').doc(currentUser?.uid).collection('userTodo').doc(id).update({
                    isComplete: item.isComplete
                }).then(() => {
                    console.log('Succesfully Data Updated')
                }).catch((err) =>{
                    console.log('Error in updating data ', err)
                })
            }
            return item
        })

        setList(updatedTodos);
        
    }

    const changePriority = (id, priority) => {
        let updatedTodos = rootTree.todos.map(item => {
            if(item.id === id){
                // item.priority = priority;
                console.log(priority);
                databaseRef.collection('todos').doc(currentUser?.uid).collection('userTodo').doc(id).update({
                    priority: priority
                }).then(() => {
                    item.onChangePriority(priority)
                    console.log('Succesfully Data Updated')
                }).catch((err) =>{
                    console.log('Error in updating data ', err);
                })
            }
            return item
        })
        setList(updatedTodos);
    }

    const filteredPriority = (e) => {

    }

    const filterByPriority =(list) => {

        switch (priority) {
            case 'all':
                return list
                
            case 'low':
            case 'medium':
            case 'high':
            default:
                const filteredList = list.filter((item) => {
                    return item.priority === priority
                })
                return filteredList;
        }
    }

    const filteredList = filterByPriority(list);

    const onDragEnd = (result) => {
        console.log(result);
        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0 , reorderedItem);
        setList(items);
    }

     async function handleLogout () {
        setError('')
        try {
            setError('')
            await logout();
            history.push('/login')

        } catch {
            setError('Failed to logout');
            history.push('/login')
        }
    }
    

    return (

        <div>
            <h1>TO DO LIST</h1>
            <p>{currentUser?.email}</p>
            <Link to="/login"><Button onClick={handleLogout} className={style["logout-btn"]} variant="link" children="Logout"></Button></Link>
            
            <TodoForm setPriority={setPriority} priority={priority} filteredPriority={filteredPriority} onSubmit={addTodoList}/>
             
            <Todo onUpdate={onUpdate} editableItem={editableItem} setEditableItem={setEditableItem} onDragEnd={onDragEnd} priority={priority}  changePriority={changePriority} completeTodo={completeTodo} list={rootTree} deleteTodo={deleteTodo}/>
        </div>
    );
}

export default observer(TodoList);