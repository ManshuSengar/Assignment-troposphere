import logo from './logo.svg';
import './App.css';
import FeeStructure from './FeeStructure';
import data from './data.json'

function App() {
  return (
    <div className="App">
     <FeeStructure data={data}/>
    </div>
  );
}

export default App;
