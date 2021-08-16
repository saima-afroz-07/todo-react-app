import React, { useState, useEffect } from 'react';
import Todo from '../Todo';
import TodoForm from '../TodoForm';
import {databaseRef} from '../../Config/Config';


function TodoList(props) {
    const [list, setList] = useState([]);
    const [priority, setPriority] = useState('all');
    const [editableItem, setEditableItem] = useState(null);
    console.log(process.env.REACT_APP_FIREBASE_API_KEY);

    const addTodoList = (todo) => {
        
        if(todo.text === ''){
            alert('Please Fill the tect field')
        } else {
           const newTodo = [...list, todo];
           setList(newTodo);
           localStorage.setItem('todo-list', JSON.stringify(newTodo));

           databaseRef.collection('todos').doc(todo.id).set(todo);
        }

        // databaseRef.child('todos').push(
        //     todo, 
        //     err => {
        //         if(err){
        //             console.log(err)
        //         } 
        //     }
        // )
        
        
    } 

    // onUpdate function
    const onUpdate = (text, item)  => {
        let filteredList = list.map((each_list) => { 
            if(item.id === each_list.id){
                each_list.text = text;
                each_list.isComplete = item.isComplete;
                each_list.priority = item.priority;
                setEditableItem(item);
                databaseRef.collection('todos').doc(item.id).update({
                    todo: item
                });
            }
            return each_list
        })
        
        
        console.log(item.id, text, filteredList);
        setList(filteredList);
        localStorage.setItem('todo-list', JSON.stringify(filteredList));
        
    }

    // const editTodo = (id, item) => {
    //     console.log(id);
    //     let filteredList = list.map((each_list) => { 
    //         return each_list.id === id ? item: each_list
    //     })
    //     setList(filteredList);
    //     localStorage.setItem('todo-list', JSON.stringify(filteredList));
    // }

    

    const deleteTodo = (id) => {
        const deleteTodo = list.filter(todo => todo.id !== id)
        console.log(deleteTodo);
        localStorage.setItem('todo-list', JSON.stringify(deleteTodo));
        setList(deleteTodo);

        databaseRef.collection('todos').doc(id).delete();
        
    }

    useEffect(() => {
        const savedList = JSON.parse(localStorage.getItem('todo-list'));

        if(savedList){
            setList(savedList);
            // console.log('if condition', savedList);
        } else {
            // console.log('else', savedList);
        }
       
    }, [])

    const completeTodo = (id) => {
        let updatedTodos = list.map(item => {
            if(item.id === id){
                item.isComplete = !item.isComplete

                databaseRef.collection('todos').doc(id).update({
                    todo: item
                });
            }
            return item
        })

        setList(updatedTodos);
        localStorage.setItem('todo-list', JSON.stringify(updatedTodos));

        
    }

    const changePriority = (id, priority) => {
        let updatedTodos = list.map(item => {
            if(item.id === id){
                item.priority = priority;

                databaseRef.collection('todos').doc(id).update({
                    todo: item
                });
            }
            return item
        })
        setList(updatedTodos);
        localStorage.setItem('todo-list', JSON.stringify(updatedTodos));
    }

    const filteredPriority = (e) => {

    }

    const filterByPriority =(list) => {
        // if(list){
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
        // }
        // return list;
    }

    const filteredList = filterByPriority(list);

    const onDragEnd = (result) => {
        console.log(result);
        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0 , reorderedItem);
        setList(items);
    }
    

    return (

        <div>
            <TodoForm setPriority={setPriority} priority={priority} filteredPriority={filteredPriority} onSubmit={addTodoList}/>
             
            <Todo onUpdate={onUpdate} editableItem={editableItem} setEditableItem={setEditableItem} onDragEnd={onDragEnd} priority={priority}  changePriority={changePriority} completeTodo={completeTodo} list={filteredList} deleteTodo={deleteTodo}/>
        </div>
    );
}

export default TodoList;