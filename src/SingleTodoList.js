import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import React, { useState } from 'react'
import SingleTodoItem from './SingleTodoItem';


function SingleTodoList({rootTree}) {
    const [text, setText] = useState('');

    const addTodo = (e) => {
        e.preventDefault();
        const newTodo = {
            id: nanoid(),
            text: text,
            isComplete: false,
            priority: 'low'
        }
        rootTree.addNewTodo(newTodo);

        console.log(rootTree.todos);
        setText('')
    }

    return (
        <div>

            <h1>Single to do list</h1>
            <form onSubmit={addTodo}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                <button>Add</button>
            </form>
            {rootTree.todos.map((item) => {
                return < SingleTodoItem   item={item} key={item.id}/>
            })}            
        </div>
    )
}

export default observer(SingleTodoList)
