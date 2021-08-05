import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TodoForm from '../TodoForm/TodoForm';
import style from './style.module.css';

function Todo({list, deleteTodo, editTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        text: ''
    })

    const submitUpade = (item) => {
        editTodo(edit.id, item);
        setEdit({
            id:null,
            text: ''
        })
    }

    // if(edit.id){
    //     return (
    //     <>
    //         <TodoForm  edit={edit} onSubmit={submitUpade} />
    //         <div>
    //             {list.map((item, index) => {
    //             return <div className="each-todo" key={index}>
    //                         <p>{item.text}</p>
    //                         <button className={style.edit} onClick={() => setEdit({id: item.id, text: item.text})}><EditIcon /></button>
    //                         <button className="delete-btn" onClick={() => deleteTodo(item.id)}><DeleteIcon /></button>    
    //                 </div>
    //             })}
    //         </div>
    //     </>
    //     )
    // }

    return (
        
            <div>
                {list.map((item) => {
                return <div key={item.id}>
                {edit.id === item.id ? (<TodoForm  edit={edit} onSubmit={submitUpade}/>):(<div className="each-todo" key={item.id}>
                        <p>{item.text}</p>
                        <button className="edit-btn" onClick={() => setEdit({id: item.id, text: item.text})}><EditIcon /></button>
                        <button className="delete-btn" onClick={() => deleteTodo(item.id)}><DeleteIcon /></button>    
                    </div>)}
                    </div>
                })}
            </div>
        )
}

export default Todo;