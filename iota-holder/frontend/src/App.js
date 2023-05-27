
import "./App.css";
import instance from "./api";
import FileUpload from "./components/FileUpload";
import GetDID from "./components/GetDID";
import GetVP from "./components/GetVP";
import { Outlet, Link } from "react-router-dom";
function App() {
  const createDID = (userName, password) => {
    
  };
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
            <Link to ={'/login/2'} id="link-button">
              <button type="button"> CreateDID </button>
            </Link>
            <GetDID />
            <GetVP />
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
