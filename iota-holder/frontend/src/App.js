
import "./App.css";
import { Outlet} from "react-router-dom";
import iota_logo from './images/IOTA_Logo_White.png'
import Nav from 'react-bootstrap/Nav'


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div id='logo'>
      <img src={iota_logo} width={204.43} height={80} alt="IOTA LOGO" />
        <h1 >
          DIGITAL IDENTITY MANAGER
        </h1>
      </div>
      <div class="position-relative">.
        <Nav   >
          <Nav.Item>
            <Nav.Link  eventKey="/createdid" href="/createdid"> Create DID</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/addvm" >Add Verification Method</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/getdid" >Get DID</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/getvp" >Get Verification Presentation</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/homepage">Home</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      </header>
    
        <div id="detail">
        <Outlet />
      </div>

    </div>
  );
}

export default App;
