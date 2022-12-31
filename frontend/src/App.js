import "./App.css";
import Home from "./Home";
import Begin from "./Begin";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">Dialogic Frontend</header>
        <Begin />
      </div>
      <div className="small-screen">
        Your screen is too small to view our work! Please switch over to an ipad or laptop. -The Dialogic Team
      </div>
    </>
  );
}

export default App;
