
import "./App.css";
import { Outlet, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <h1 >
          Welcome to IOTA APP!
        </h1>
      </header>
      <div id="sidebar">
          <h1> IOTA Function</h1>
          <div id="button-container">
            <Link to ={'/createdid'} id="link-button">
              <button type="button"> Create DID </button>
            </Link>
            <Link to ={'/addvm'} id="link-button">
              <button type="button"> Add Verification Method </button>
            </Link>
            <Link to ={'/getdid'} id="link-button">
              <button type="button"> Get DID </button>
            </Link>
            <Link to ={'/getvp'} id="link-button">
              <button type="button"> Get Verification Presentation </button>
            </Link>
            <Link to ={'/homepage'} id="link-button">
              <button type="button"> Home </button>
            </Link>
          </div>
        </div>

        <div id="detail">
        <Outlet />
      </div>

    </div>
  );
}

export default App;
