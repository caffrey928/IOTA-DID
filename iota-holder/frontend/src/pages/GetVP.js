import React, { useState } from "react";
import instance from "../api";
import Card from "react-bootstrap/Card";
import "react-json-view-lite/dist/index.css";
import downloadFile from "../downloadFileAPI";
import FileDownload from "js-file-download";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleWord, setToggleWord] = useState("show");
  const [passwordType, setPasswordType] = useState("password");
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [bothEmpty, setBothEmpty] = useState(false);
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState("");
  const [verificationError, setVerificationError] = useState(false);
  const [challenge, setChallenge] = useState("");
  const [challengeError, setChallengeError] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChallenge = (e) => {
    setChallenge(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleVC = (e) => {
    setVerificationMethod(e.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setToggleWord("hide");
      return;
    }
    setPasswordType("password");
    setToggleWord("show");
  };
  const handleLogin = (e) => {
    setLoading(true);
    setNameError(false);
    setNameEmpty(false);
    setPasswordEmpty(false);
    setBothEmpty(false);
    setPasswordError(false);
    setFileError(false);
    setChallengeError(false);
    setVerificationError(false);

    if (password === "" && username === "") {
      setBothEmpty(true);
      setLoading(false);
    } else if (password === "") {
      setPasswordEmpty(true);
      setLoading(false);
    } else if (username === "") {
      setNameEmpty(true);
      setLoading(false);
    } else if (!file) {
      setFileError(true);
      setLoading(false);
    } else if (verificationMethod === "") {
      setVerificationError(true);
      setLoading(false);
    } else if (challenge === "") {
      setChallengeError(true);
      setLoading(false);
    } else {
      instance
        .post("/checkUsrName", {
          usrname: username,
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        })
        .then((res) => {
          if (res.data !== "Exist") {
            setNameError(true);
          }
          console.log(res);
          if (res.data === "Exist") {
            console.log(res.data);
            let formData = new FormData();
            console.log("file", file);
            formData.append("file", file);
            console.log(formData);
            const config = {
              headers: { "Content-Type": "multipart/form-data" },
            };
            instance
              .post("/uploadFile", formData, config)
              .catch((err) => {
                console.log(err);
                setLoading(false);
              })
              .then((res) => {
                console.log(res);
                console.log(file.name);
                setLoading(false);
                instance
                  .get("/VP", {
                    params: {
                      holderName: username,
                      holderPassword: password,
                      fragment: verificationMethod,
                      credentialFile: file.name,
                      challenge: challenge,
                    },
                  })
                  .then((res) => {
                    console.log(res);
                    downloadFile
                      .get("downloadVP", { params: { name: username } })
                      .then((res) => {
                        console.log(res);
                        FileDownload(
                          res.data,
                          username.concat("-presentation.json")
                        );
                        setLoading(false);
                        instance.post("/removeFile");
                      })
                      .catch((err) => {
                        console.log(err);
                        setLoading(false);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                  });
              });
          } else {
            setLoading(false);
          }
        });
    }
  };

  return (
    <div id="login">
      <div className="card-body">
        <div className="form-control">
          <span className="label-text">
            <p>User Name: </p>
          </span>
          <input
            type="text"
            placeholder="user name"
            className="input-bordered"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="form-control">
          <span className="label-text">
            <p>Password: </p>
          </span>
          <input
            type={passwordType}
            placeholder="password"
            id="input-bordered"
            value={password}
            onChange={handlePassword}
          />
          <div id="show_pass">
            <button
              className="btn btn-outline-primary"
              onClick={togglePassword}>
              {passwordType === "password" ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
              {toggleWord}
            </button>
          </div>
        </div>
        <div className="form-control">
          <span className="label-text">
            <p>Verification Method: </p>
          </span>
          <input
            type="text"
            placeholder="fragment"
            className="input-bordered"
            value={verificationMethod}
            onChange={handleVC}
          />
        </div>
        <div className="form-control">
          <span className="label-text">
            <p>Challenge: </p>
          </span>
          <input
            type="text"
            placeholder="challenge"
            className="input-bordered"
            value={challenge}
            onChange={handleChallenge}
          />
        </div>
        <div className="form-control">
          <span className="label-text">
            <p>Credential File: </p>
          </span>
          <input type="file" accept=".json" onChange={handleFileChange} />
        </div>
        <div id="getvp-button">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
            disabled={loading}>
            {loading ? <p>Geting...</p> : <p>Get</p>}
          </button>
        </div>
        <div id="name_error">
          {nameError ? (
            <p>User does not Exist! Please try another name.</p>
          ) : (
            <p></p>
          )}
        </div>
        <div id="name_empty">
          {bothEmpty ? <p>Please fill in usrname and password!</p> : <p></p>}
        </div>
        <div id="name_empty">
          {passwordEmpty ? <p>Please fill in password!</p> : <p></p>}
        </div>
        <div id="name_empty">
          {nameEmpty ? <p>Please fill in username!</p> : <p></p>}
        </div>
        <div id="name_empty">
          {passwordError ? <p>Wrong passwrd!</p> : <p></p>}
        </div>
        <div id="name_empty">{fileError ? <p>Empty file!</p> : <p></p>}</div>
        <div id="name_empty">
          {challengeError ? <p>Empty challenge!</p> : <p></p>}
        </div>
        <div id="name_empty">
          {verificationError ? <p>Empty verification method!</p> : <p></p>}
        </div>
        <div id="DID">
          <Card id="display-card">
            <p>Instruction:</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
