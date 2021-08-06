import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import Input from '../Inputs/Input';
import Button from '../Buttons/Button';
import style from './style.module.css'

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.text : '');
    
    const handleSubmit = (event) => {
        event.preventDefault();

        props.onSubmit({
            id: nanoid(),
            text: input
        })

        setInput('');
    }

    const handleChange = (event) => {

        setInput(event.target.value);
    }

    return (
        <>
            <form className={style['todo-form']} onSubmit={handleSubmit}>
                {props.edit ? (
                <>
                <div>
                    <Input placeholder={'Edit to do'} value={input} onChange={handleChange}/>
                    <Button children="Update"/>
                </div>
                    
                </>
                ) : (
                <>
                    <Input placeholder={'Add a ToDo'} value={input} onChange={handleChange}/>
                    <Button children="Add"/>
                </>
                )
                }
            </form>
            <div>{props.list}</div>
        </>
    );
}

export default TodoForm;