import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'


function SingleTodoItem({item}) {
    const [text, setText] = useState('');
    
    const [edit, setEdit] = useState(false)

    const deleteTodo = (e) =>{
        item.deleteTodo();
    }

    const updateTodo = () => {
        setEdit(false);
        item.onUpdate(text);
        console.log(item.text, text)
    }

    return (
        <>
        {edit ? (<form onSubmit={updateTodo}>
                <input type="text" onChange={(e) => setText(e.target.value)}/>
                <button type="submit">Update</button>
            </form>):(<div>
            <h1> {item.text}</h1>
            <button onClick={() => setEdit(true)}>edit</button>
            <button onClick={deleteTodo}>delete</button>
        </div>)}
        </>
    )
}

export default observer(SingleTodoItem)
