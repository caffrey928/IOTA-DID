import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
import { Verify } from "./api";

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
      const proof = JSON.parse(fileReader.result as string).proof
      if(proof) setChallenge(proof.challenge as string)
    };
  };

  const handleVerify = () => {
    Verify(files, challenge).then((res) => {
      setVerified(res);
    });
  };

  return (
    <>
      <div>
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
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
      {<p>{verified}</p>}
      {"uploaded file content -- " + files}
    </>
  );
}

export default App;
