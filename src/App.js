import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="container">
      <h1>TO DO LIST</h1>
      <div className="todo-form">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
