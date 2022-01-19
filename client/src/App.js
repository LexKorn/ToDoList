import React from 'react';
import axios from 'axios';
import ToDoItem from './component/ToDo/ToDoItem';

function App() {

  let [todo, setTodo] = React.useState([]);

  React.useEffect(() => {
    let data = axios.get('http://localhost:8000');

    data.then(res => {
      setTodo(res.data);
    });
  }, []);  

  let input = React.createRef()

  let postData = () => {
    let post = axios.post('http://localhost:8000', {
      id: null,
      task: input.current.value,
      isDone: 0
    });
    console.log(input.current.value);
  }
  

  return (
    <div className='site_wrapper'>
      <h1>TO DO LIST</h1>
      <div className='addTask_wrapper'>
          <input ref={input} placeholder='Write task!'/>
          <button onClick={postData}>Add Task</button>
      </div>
        {
          todo.map(el => {
            return <ToDoItem task={el.task} id={el.id}/>
          })
        }
    </div>
  );
}

export default App;