import './App.css';
import Home from './components/Home/Home';
import SingleTodoList from './SingleTodoList';
import setupRootStore from './models/Setup';

function App() {
  const {rootTree} = setupRootStore();
  return (
    <>
    <Home />
    {/* <SingleTodoList rootTree={rootTree}/> */}
    </>
  );
}

export default App;
