import { useState } from "react";
import React from "react";
import './App.css';
import { Icon } from "@iconify/react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {
  const [job, setjob] = useState('');
  const [jobs, setjobs] = useState([]);

  const handleSubmit = () => {
    if(job !== ''){
    setjobs(prev =>{
      const newJobs = [...prev, job]
      return newJobs;
    });
  }
  setjob(''); 
}
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
  return (
    <div className="App flex flex-col">
      <div className="title">
        <h1>Todo List</h1>
      </div>
      <div className="input-box">
        <input 
        value={job} 
        onChange={e => setjob(e.target.value)}
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
          {jobs.map((job, index) => (
            <li className="work notDone" id={index} key={index}>{job} <span className="unseen d-text" id = {index + '-done'}>[done]</span>
            <button id = {index + '-delete'} onClick={() => {
              const Work = document.getElementById(index);
              Work.remove();
            }}><Icon icon="material-symbols:delete" /></button>
            <button><Icon icon="uil:edit"/></button>
            <button><Icon icon="ph:check-duotone" onClick={() => {
              const Work = document.getElementById(index);
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
              }
            }}/></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;