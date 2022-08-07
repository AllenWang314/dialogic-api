import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Dialogic Frontend
      </header>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <Home />
    </div>
  );
}

export default App;
