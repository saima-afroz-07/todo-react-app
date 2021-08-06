import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TodoForm from '../TodoForm/TodoForm';
import style from './style.module.css';
import Button from '../Buttons/Button';

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

    return (
        
            <div>
                {list.map((item) => {
                return <div key={item.id}>
                {edit.id === item.id ? (<TodoForm  edit={edit} onSubmit={submitUpade}/>):(<div className={style['each-todo']} key={item.id}>
                        <p>{item.text}</p>
                        <Button className={style['edit-btn']} onClick={() => setEdit({id: item.id, text: item.text})}><EditIcon /></Button>
                        {/* <button className="edit-btn" onClick={() => setEdit({id: item.id, text: item.text})}><EditIcon /></button> */}
                        {/* <button className="delete-btn" onClick={() => deleteTodo(item.id)}><DeleteIcon /></button>   */}
                        <Button className={style['delete-btn']} onClick={() => deleteTodo(item.id)}><DeleteIcon /></Button>  
                    </div>)}
                    </div>
                })}
            </div>
        )
}

export default Todo;