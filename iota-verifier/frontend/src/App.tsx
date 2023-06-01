import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
import { Verify } from "./api";
import MainDialog from "./components/main_dialog";

function App() {
  const [count, setCount] = useState(0);
  const [files, setFiles] = useState("");
  const [challenge, setChallenge] = useState("");
  const [verified, setVerified] = useState("Not Verified");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const target = e.target as HTMLInputElement;

    if (!target.files) return;
    fileReader.readAsText(target.files[0], "UTF-8");

    fileReader.onload = () => {
      setFiles(fileReader.result as string);
    };
  };

  const handleVerify = () => {
    Verify(files, challenge).then((res) => {
      setVerified(res);
    });
  };

  const generate_challenge = (length: number) => {
    const characters = 
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    // Create an array of 32-bit unsigned integers
    const randomValues = new Uint32Array(length);
    
    // Generate random values
    window.crypto.getRandomValues(randomValues);
    randomValues.forEach((value) => {
      result += characters.charAt(value % charactersLength);
    });

    setChallenge(result)
  }

  return (
    <>
      <MainDialog/>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Button variant="contained" component="label" onClick={() => generate_challenge(6)}>
        Generate Challenge
      </Button>
      <p className="read-the-docs">
        Challenge: {challenge ? challenge : "Click 'Generate Challenge' to get a random challenge!"}
      </p>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" accept=".json" onChange={handleChange} hidden />
      </Button>
      <br />
      <br />
      <Button variant="outlined" onClick={handleVerify}>
        Verify
      </Button>
      {<p>{verified}</p>} */}
    </>
  );
}

export default App;
