import './App.css';
import {Form} from '../form/Form';

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
            <p>This is a small GUI for visualze the backend responses</p>
            <ul>
              <li>Search by owner needs the complete name of the owner</li>
              <li>Search by prefix name needs a prefix to get the name of the pet</li>
            </ul>
            <Form search_type='Pets'></Form>          
          </div>
          <div className='Half-panel'>
            <h2>Results</h2>
          </div>

        </div>
      </header>

    </div>
  );
}

export default App;
