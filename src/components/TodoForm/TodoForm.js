import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import Input from '../Inputs/Input';
import Button from '../Buttons/Button';

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
            <form className="todo-form" onSubmit={handleSubmit}>
                {props.edit ? (
                <>
                <div>
                    {/* <input type="text" placeholder="Edit to do" value={input} onChange={handleChange} ></input> */}
                    <Input placeholder={'Edit to do'} value={input} onChange={handleChange}/>
                    {/* <button >Update</button> */}
                    <Button children="Update"/>
                </div>
                    
                </>
                ) : (
                <>
                    {/* <input type="text" placeholder="Add a ToDo" value={input} onChange={handleChange}></input> */}
                    <Input placeholder={'Add a ToDo'} value={input} onChange={handleChange}/>
                    {/* <button>Add</button> */}
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