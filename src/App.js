import React from "react";
import './App.css';
import { Icon } from "@iconify/react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const getTodo = JSON.parse(localStorage.getItem("todos"));
    if(getTodo === null || getTodo === []){
          console.log('error')
          setTodos([]);
    } else {
      console.log('sucess')
      setTodos(getTodo);
    }
    console.log(getTodo);

  }, []);

  function handleSubmit(e) {
    if(todo !== ''){
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
      done: false,
    };

    setTodos([...todos].concat(newTodo));
    const newestTodo = [...todos].concat(newTodo)
    localStorage.setItem("todos", JSON.stringify(newestTodo));
    setTodo("");
  }}
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
const handleDelete = (id) => {
  let updatedTodos = [...todos].filter((todo) => todo.id !== id);
  setTodos(updatedTodos);
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify([...todos].filter((todo) => todo.id !== id)));
};
const doneWork = (id) => {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.done = !todo.done;
      console.log(todo);
    }
    return todo;
  });
  setTodos(updatedTodos);

  localStorage.setItem("todos", JSON.stringify(todos));
};
function submitEdits(id, i) {
  const remove = document.getElementById(i + '-input')
  remove.classList.add('input-unseen')
  const updatedTodos = [...todos].map((todo) => {
    if (todo.id === id && editingText !== '') {
      todo.text = editingText;
    }
    return todo;
  });
  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(todos));
  setEditingText('');
}
  return (
    <div className="App flex flex-col">
      <div className="title">
        <h1>Todo List</h1>
      </div>
      <div className="input-box">
        <input 
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        placeholder="Task"
        />
        <button onClick={handleSubmit} className="btn">Add</button>
        <ul className="list-work">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="All" onClick={() => {
          const divs = document.querySelectorAll('.work-unseen');
          for (const div of divs) {
            div.classList.remove('work-unseen');
          }
        }}/>
        <Tab label="Active" onClick={() => {
          const divs = document.querySelectorAll('.work-unseen');
          for (const div of divs) {
            div.classList.remove('work-unseen');
          }
          var items = document.getElementsByClassName('done');
          for(var i = 0; i < items.length; i++){
            items[i].classList.add('work-unseen');
          }
        }}/>
        <Tab label="Compeleted" onClick={() => {
          const backs = document.querySelectorAll('.work-unseen');
          for (const back of backs) {
            back.classList.remove('work-unseen');
          }
          const divs = document.querySelectorAll('.notDone');
          for (const div of divs) {
            div.classList.add('work-unseen');
          }
        }}/>
      </Tabs>
    </Box>
          {todos.map((todo, index) => { if(todo.done === false){
            return(
          (
            <div className="main" id={index} key={index}>
            <li className="work notDone" id= {index + "-work"}> <span className="notDone">{todo.text} </span><span className="unseen d-text" id = {index + '-done'}>[done]</span>
            <button id = {index + '-delete'} onClick={() => handleDelete(todo.id)}><Icon icon="material-symbols:delete" /></button>

            <button onClick={() => {
              const change = document.getElementById(index +'-input')
              if(change.classList.contains('input-unseen')){
                change.classList.remove('input-unseen')
                todo.isEditing = true
              } else {
                change.classList.add('input-unseen')
                todo.isEditing = false
              }
            }}><Icon icon="uil:edit"/></button>

            <button onClick={() => doneWork(todo.id) }><Icon icon="ph:check-duotone"/></button>
            </li>
            <div id={index +'-input'} className="notDone flex input-unseen">
            <input onChange={(e) => setEditingText(e.target.value) }/> <button id={index+'-changebtn'} className="btn" onClick={() => submitEdits(todo.id, index)}>Change</button>
            </div>
            </div>
          ))}else if(todo.done === true){
            return(
              (
                <div className="main" id={index} key={index}>
                <li className="work done" id= {index + "-work"}> <span className="work-text">{todo.text} </span><span className="unseen d-text" id = {index + '-done'}>[done]</span>
                <button id = {index + '-delete'} onClick={() => handleDelete(todo.id)}><Icon icon="material-symbols:delete" /></button>
    
                <button onClick={() => {
                  const change = document.getElementById(index +'-input')
                  if(change.classList.contains('input-unseen')){
                    change.classList.remove('input-unseen')
                    todo.isEditing = true
                  } else {
                    change.classList.add('input-unseen')
                    todo.isEditing = false
                  }
                }}><Icon icon="uil:edit"/></button>
    
                <button onClick={() => doneWork(todo.id) }><Icon icon="ph:check-duotone"/></button>
                </li>
                <div id={index +'-input'} className="notDone flex input-unseen">
                <input onChange={(e) => setEditingText(e.target.value) }/> <button id={index+'-changebtn'} className="btn" onClick={() => submitEdits(todo.id, index)}>Change</button>
                </div>
                </div>
              )
            )
          }
        }
            )}
        </ul>
      </div>
    </div>
          );
}

export default App;
