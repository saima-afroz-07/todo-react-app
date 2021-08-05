import React, { useState, useEffect } from 'react';
import Todo from '../Todo';
import TodoForm from '../TodoForm';


function TodoList(props) {
    const [list, setList] = useState([])

    const addTodoList = (todo) => {
        
        if(todo.text === ''){
            alert('Please Fill the tect field')
        } else {
           const newTodo = [...list, todo];
           setList(newTodo);
           localStorage.setItem('todo-list', JSON.stringify(newTodo));
        }
        
    } 

    const editTodo = (id, text) => {
        console.log('edit');
        let filteredList = list.map((item) => {
            return item.id === id ? text: item
        })
        setList(filteredList);
        localStorage.setItem('todo-list', JSON.stringify(filteredList));
    }

    const deleteTodo = (id) => {
        const deleteTodo = list.filter(todo => todo.id !== id)
        console.log(deleteTodo);
        localStorage.setItem('todo-list', JSON.stringify(deleteTodo));
        setList(deleteTodo);
    }

    useEffect(() => {
        const savedList = JSON.parse(localStorage.getItem('todo-list'));
        if(savedList){
            setList(savedList);
            console.log('if condition', savedList);
        } else {
            console.log('else', savedList);
        }
       
    }, [])

    return (
        <div>
            <TodoForm onSubmit={addTodoList}/>
            <Todo list={list} deleteTodo={deleteTodo} editTodo={editTodo}/>
        </div>
    );
}

export default TodoList;