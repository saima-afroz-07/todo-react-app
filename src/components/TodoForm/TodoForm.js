import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import Input from '../Input';
import Button from '../Button';
import style from './style.module.css'
import { FormControl, MenuItem, Select } from '@material-ui/core';

function TodoForm({edit, list, onSubmit, filteredPriority, priority, setPriority, onUpdate}) {
    const [input, setInput] = useState(edit ? edit.text : '');
    const inputPlaceholder = edit ? 'Edit to Do' : 'Add To Do';
    const buttonText = edit ? 'Update' : 'Add';
    // const [priority, setPriority] = useState('none');
    
    const handleSubmit = (event) => {
        event.preventDefault();

        if(edit){
            // update 
            // on update function - pass as prop from todo
            console.log(input, edit)
            onUpdate(input, edit)
        } else {
           onSubmit({
            id: nanoid(),
            text: input,
            isComplete: false,
            priority: 'low'
          }) 
          setInput('');
        }

        
    }

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    const filterPriority = (e) => {
        filteredPriority (e.target.value);
        setPriority(e.target.value);
        console.log(e.target.value, priority);
    }
    

    return (
        <>
            <form className={style['todo-form']} onSubmit={handleSubmit}>
                <div>
                    <Input placeholder={inputPlaceholder} value={input} onChange={handleChange}/>
                    <Button children={buttonText}/>
                    {!edit ? (<FormControl>
                        <Select onChange={(e) => filterPriority(e)} value={priority}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>): <></>}
                </div>
            </form>
            <div>{list}</div>
        </>
    );
}

export default TodoForm;