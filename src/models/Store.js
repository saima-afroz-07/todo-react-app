import { destroy, getParent, types } from "mobx-state-tree";

const Todo = types.model({
    id: types.string,
    priority: types.string,
    text: types.string,
    isComplete: types.boolean
}).actions(self => ({
    onUpdate(text){
        self.text = text
    },
    completeTodo(status){
        self.isComplete = status;
    },
    onChangePriority(priority){
        self.priority = priority
    },
    deleteTodo(){
        getParent(self, 2).remove(self)
    }
}))

export const TodoListModel = types.model({
    todos: types.array(Todo)
}).actions(self => ({
    addNewTodo(newTodo){
        self.todos.push(newTodo)
    },
    setTodos(todos){
        self.todos = todos
    },
    remove(todo){
        destroy(todo)
    }
}))

