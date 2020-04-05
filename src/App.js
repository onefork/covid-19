import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Search from './Search';
import Graph from './Graph';

const App = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>COVID-19 Papers</h1>
      <Search />
      <Graph />
    </div>
  );
}

export default App;
