import React, { useState } from "react";
import instance from "../api";
import Card from "react-bootstrap/Card";
import "react-json-view-lite/dist/index.css";
import downloadFile from "../downloadFileAPI";
import FileDownload from "js-file-download";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import img_hide from '../images/hide.png'
import img_view from '../images/view.png'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleWord, setToggleWord] = useState("show");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [verificationMethod, setVerificationMethod] = useState("");
  const [challenge, setChallenge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
  const handleVM = (e) => {
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
    setErrorMessage("");

    if (password === "" && username === "") {
      setErrorMessage("Please enter username and password!");
      setLoading(false);
    } else if (password === "") {
      setErrorMessage("Please enter password!");
      setLoading(false);
    } else if (username === "") {
      setErrorMessage("Please enter username!");
      setLoading(false);
    } else if (!file) {
      setErrorMessage("Please choose the correct file!");
      setLoading(false);
    } else if (verificationMethod === "") {
      setErrorMessage("Please enter the fragment!");
      setLoading(false);
    } else if (challenge === "") {
      setErrorMessage("Please enter challenge!");
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
            setErrorMessage("User doesn't exist!");
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
                        setErrorMessage("Something wrong!");
                        setLoading(false);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    setErrorMessage("Something wrong!");
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
      <Card style={{ width: '25rem' }} className="DID_card">
                <Container className='login_container'>
                <Form>
                    <Form.Group className="mb-3" controlId="user name">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="user name"  value={username} onChange={handleUsername} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type={passwordType} placeholder="password" id="input-bordered" value={password} onChange={handlePassword} /> 
                            <div class="input-group-append" style={{marginTop:"10px"}}>
                              <button type="button" className="btn btn-outline-info btn-sm" onClick={togglePassword} style={{height: "38px"}}>
                                { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                                {toggleWord==="show" ? <img src={img_hide} alt="hide" width={'25px'}/>: <img src={img_view} width={"25px"} alt="show"/>}
                                </button>
                            </div>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fragment">
                        <Form.Label>Verification Method</Form.Label>
                        <Form.Control type="text" placeholder="fragment"  value={verificationMethod} onChange={handleVM} /> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="challenge">
                        <Form.Label>Challenge</Form.Label>
                        <Form.Control type="text" placeholder="challenge"  value={challenge} onChange={handleChallenge} /> 
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Credential File</Form.Label>
                      <Form.Control type="file" accept=".json" onChange={handleFileChange}/>
                    </Form.Group>
                    <Form.Group>
                        <div className="text-center align-items-center">
                            <button type="button" className="btn btn-outline-light" onClick={handleLogin} disabled={loading} style={{height: "40px", width:'10rem'}}>
                                {loading ? <p>Getting...</p> : <p>Get</p>}
                            </button>
                        </div>
                    </Form.Group>
                </Form>
                </Container>
            </Card>
            <div id="errorMessage">
                <p>{errorMessage}</p>
            </div>
            <div id="DID">
                <Card id="display-card">
                  <h1>
                     Get Verification Presentation
                  </h1>
                  <p>
                    1. Enter correct username, password, fragment and challenge.<br/><br/>
                    2. Select the credential json file, which should be provided by issuer<br/><br/>
                    3. Challeng is randomly generated by verifier.
                  </p>
                </Card>
            </div>
    </div>
  );
}
