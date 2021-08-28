import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { loadavg } from 'os';
import { render } from '@testing-library/react';

async function Getnames() {
  const response = await axios.get('http://172.0.0.1:30000/api/challenges/names');
  return response.data
}

async function Datas(name:string) {
  const response = await axios.get('http://172.0.0.1:30000/api/challenges?challenge_name='+ name);
  return response.data
}


function App() {
  const [link, setlink] = React.useState(false);
  const names = Getnames();
  return (
    <div className="App">
      <header className="App-header">
        Results rezalgo
      </header>
      <div className="flex">
        <ul>
          {names}
        </ul>
        <div>
          infos
        </div>
      </div>
    </div>
  );
}

export default App;
