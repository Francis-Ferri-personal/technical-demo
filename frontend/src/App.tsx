import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const handleClick = () => {
    console.log('Search button clicked');
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Technical demo</h1>


        <div className='Main-panel'>
          <div className='Half-panel'>
            <h2>Search options</h2>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className='Half-panel'>
            <h2>Results</h2>
          </div>

        </div>
      </header>

    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React 2
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
