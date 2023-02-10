import logo from './logo.svg';
import './App.css';
import FeeStructure from './FeeStructure';
import data from './data.json'

function App() {
  return (
    <div className="App">
      <div className='heading'>
        <h1>Assignment Solution</h1>
      </div>
      <div id='div-fee'></div>
     <FeeStructure data={data}/>
    </div>
  );
}

export default App;
