import React from "react";
import './App.css';
import { Icon } from "@iconify/react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
function submitEdits(id) {
  const update = [...todos].map((todo) => {
   if(todo.id === id){
    todo.text = editingText;
   }
   return todo
   setTodos(update);
  });
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
          console.log('open all tabs');
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
          console.log('open active tabs');
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
          console.log('open completed tabs');
          const divs = document.querySelectorAll('.notDone');
          for (const div of divs) {
            div.classList.add('work-unseen');
          }
        }}/>
      </Tabs>
    </Box>
          {todos.map((todo, index) => (
            <div id={index}>
            <li className="work notDone" id= {index + "-work"} key={index}>{todo.text} <span className="unseen d-text" id = {index + '-done'}>[done]</span>
            <button id = {index + '-delete'} onClick={() => {
              const Work = document.getElementById(index);
              Work.remove();
            }}><Icon icon="material-symbols:delete" /></button>

            <button onClick={() => submitEdits(todo.id)}><Icon icon="uil:edit"/></button>

            <button onClick={() => {
              const Work = document.getElementById(index +'-work');
              if(Work.classList.contains('done')){
                Work.classList.remove('done');
                Work.classList.add('notDone');
                const doneText = document.getElementById(index + '-done')
                console.log(doneText);
                doneText.classList.add('unseen')
              }else{
                Work.classList.add('done');
                Work.classList.remove('notDone')
                const doneText = document.getElementById(index + '-done')
                console.log(doneText);
                doneText.classList.remove('unseen')
              }}}><Icon icon="ph:check-duotone"/></button>
            </li>
            <input onChange={(e) => setEditingText(e.target.value) }/> <button onChange={submitEdits(todo.id)}></button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;