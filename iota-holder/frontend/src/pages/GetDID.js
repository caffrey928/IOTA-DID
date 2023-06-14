import React, { useState } from 'react';
import instance from "../api";
import Card from 'react-bootstrap/Card';
import { JsonView,  defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import downloadFile from "../downloadFileAPI";
import FileDownload from "js-file-download";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import img_hide from '../images/hide.png'
import img_view from '../images/view.png'

export default function GetDID(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [toggleWord, setToggleWord] = useState("show");
    const [passwordType, setPasswordType] = useState("password");
    const [loading, setLoading] = useState(false);
    const [iotaDID, setIotaDID] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleUsername = (e) => {
        setUsername(e.target.value);
      }; 
    const handlePassword = (e) => {
        setPassword(e.target.value);
      };
    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         setToggleWord("hide")
         return;
        }
        setPasswordType("password")
        setToggleWord("show")
      }
    const handleLogin = (e) => {
        setLoading(true);
        setErrorMessage("")
        setIotaDID("")
        if(password==="" && username===""){
            setErrorMessage("Please enter username and password!");
            setLoading(false);
        }else if(password===""){
            setErrorMessage("Please enter password!");
            setLoading(false);
        }else if(username===""){
            setErrorMessage("Please enter username!");
            setLoading(false);
        }else{
            
            instance
            .post("/checkUsrName",{
                usrname: username,
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage("Something wrong!");
            })
            .then((res)=>{
                if(res.data!=="Exist"){
                    setErrorMessage("User does not exist!");;
                }
                console.log(res)
                if(res.data==="Exist"){
                    console.log(res.data)
                    instance
                    .get("/loadDID", { params: { name: username, password: password } })
                    .then((res) => {
                        console.log(res);
                        setIotaDID(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        setErrorMessage("Something wrong!");
                        setLoading(false);
                    });
                }else{
                    setLoading(false);
                }
            })
            
        }
    };
    const downloadSH = async()=>{
        downloadFile
      .get("/downloadSH", { params: { name: username } })
      .then((res) => {
        console.log(res);
        FileDownload(res.data, username.concat(".hodl"));
      })
      .catch((err) => {
        console.log(err);
      });
    };
    return(
        <div id="login">
            <Card style={{ width: '25rem' }} className="DID_card">
                <Container className='login_container'>
                <Form>
                    <Form.Group className="mb-3" controlId="user name">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="user name" id="input-bordered" value={username} onChange={handleUsername} />
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
                        {(iotaDID!=="" && iotaDID!=="Repeat") ?
                        <div>
                            <p>Download Your Stronghold File: </p>
                            <button id="download" className="btn btn-light" onClick={downloadSH}>Download</button>
                            <p>Your DID document: </p>
                            <JsonView id="json-word" data={iotaDID} shouldInitiallyExpand={(level) => true} style={defaultStyles} />
                        </div>:
                        <div>
                            <h1>
                                Get Digital Identity
                            </h1>
                            <p>
                                1. Enter correct username, password.<br/><br/>
                            </p>
                        </div>
                        }
                </Card>
            </div>
        </div>

    )

}