import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TodoForm from '../TodoForm';
import style from './style.module.css';
import Button from '../Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import {DragDropContext , Droppable, Draggable } from 'react-beautiful-dnd';
import { Link} from 'react-router-dom'
import { observer } from 'mobx-react-lite';



function Todo({list, deleteTodo, editTodo, completeTodo, changePriority, onDragEnd, setEditableItem, editableItem, onUpdate}) {

    //here i will recieve the prop and pass in todoform as prop
    const handleChange = (e, item) => {
        const priority = e.target.value;
        changePriority(item.id, priority);
        console.log(e.target.value, item.priority);
    }

    const getUpdateForm = (id) => {
        const updateTodoItem = list.todos.find(item =>  item.id === id);
        console.log(list.todos)
        return <TodoForm onUpdate={onUpdate} edit={updateTodoItem}/>
    }

    return (
        
            <>
            
            <div>
                {list.todos.map((item) => {
                return <div key={item.id}>
                {
                editableItem === item.id && !item.isComplete ? (getUpdateForm(item.id)
                ):(
                    !item.isComplete  ? (<><div className={style['each-todo']} key={item.id}>
                        <p onClick={() => completeTodo(item.id)} className={item.isComplete ? style["strike-text"] : ""} >{item.text}</p>
                        <Button className={style['edit-btn']} onClick={() => setEditableItem(item.id)}><EditIcon /></Button>
                        <Button className={style['delete-btn']} onClick={() => deleteTodo(item.id)}><DeleteIcon /></Button>
                        
                        <FormControl>
                            <Select onChange={(e) => handleChange(e, item)} value={item.priority} label="Priority">
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </Select>
                        </FormControl>
                        <Link to={`/todo/${item.id}`}><Button className={style['nav-btn']}><ArrowForwardIosIcon /></Button></Link>
                    
                            
                    </div></>) : <></>
                )}
                </div>
                })}
            </div>
            <h1>TASK COMPLETED</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='lists'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {list.todos.map((item, index) => {

                                return (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(draggableProvided) => (
                                            <div {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps} ref={draggableProvided.innerRef}>
                                                {editableItem === item.id && item.isComplete ? (getUpdateForm(item.id)
                                                ):(
                                                    item.isComplete ? (<><div className={style['each-todo']} key={item.id}>
                                                        <p onClick={() => completeTodo(item.id)} className={item.isComplete ? style["strike-text"] : ""} >{item.text}</p>
                                                        <Button className={style['edit-btn']} onClick={() => setEditableItem(item.id)}><EditIcon /></Button>
                                                        <Button className={style['delete-btn']} onClick={() => deleteTodo(item.id)}><DeleteIcon /></Button>  
                                                        <FormControl>
                                                            <Select onChange={(e) => handleChange(e, item)} value={item.priority} label="Priority">
                                                                <MenuItem value="low">Low</MenuItem>
                                                                <MenuItem value="medium">Medium</MenuItem>
                                                                <MenuItem value="high">High</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <Link to={`/todo/${item.id}`}><Button className={style['nav-btn']}><ArrowForwardIosIcon /></Button></Link>
                                                    </div></>) : <></>
                                                )}
                                            </div>
                                        )}
                                        
                                    </Draggable>
                                )
                            })} 
                        </div>
                    )}
                   
                </Droppable>
                
                </DragDropContext>
            
            </>
        )
}

export default observer(Todo);