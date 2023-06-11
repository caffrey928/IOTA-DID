import React, { useState } from 'react';
import instance from "../api";
import Card from 'react-bootstrap/Card';
import { JsonView,  defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import downloadFile from "../downloadFileAPI";
import FileDownload from "js-file-download";


export default function CreateDID(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verificationMethod, setVerificationMethod] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [toggleWord, setToggleWord] = useState("show");
    const [nameError, setNameError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nameEmpty, setNameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [bothEmpty, setBothEmpty] = useState(false);
    const [iotaDID, setIotaDID] = useState("")
    const [verificationEmpty, setVerificationEmpty] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
      }; 
    const handlePassword = (e) => {
        setPassword(e.target.value);
      };
    const handleVM = (e) => {
        setVerificationMethod(e.target.value);
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
        setNameError(false);
        setNameEmpty(false)
        setPasswordEmpty(false)
        setBothEmpty(false)
        setVerificationEmpty(false)
        setIotaDID("")
        
        if(password==="" && username===""){
            setBothEmpty(true);
            setLoading(false);
        }else if(password===""){
            setPasswordEmpty(true)
            setLoading(false);
        }else if(username===""){
            setNameEmpty(true);
            setLoading(false);
        }else if(verificationMethod===""){
            setVerificationEmpty(true);
            setLoading(false);
        }else{
            
            instance
            .post("/checkUsrName",{
                usrname: username,
            })
            .catch((err) => {
                console.log(err);
            })
            .then((res)=>{
                if(res.data==="Exist"){
                    setNameError(true);
                }
                console.log(res)
                if(res.data!=="Exist"){
                    console.log(res.data)
                    instance
                    .post("/createDID", {
                        userName: username,
                        password: password,
                        verificationMethod: verificationMethod,
                    })
                    .then((res) => {
                        console.log(res);
                        if(res.data !=="Repeat"){
                            setIotaDID(res.data);
                        }
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
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
            <div className="card-body">
                <div className="form-control">
                    <span className="label-text"><p>User Name:    </p></span>
                    <input type="text" placeholder="user name" className="input-bordered" value={username} onChange={handleUsername}/>
                </div>
                <div className="form-control">
                    <span className="label-text"><p>Password: </p></span>
                    <input type={passwordType} placeholder="password" id="input-bordered" value={password} onChange={handlePassword}/>
                    <div id="show_pass">
                        <button className="btn btn-outline-primary" onClick={togglePassword}>
                            { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                            {toggleWord}
                        </button>
                    </div>
                </div>
                <div className="form-control">
                    <span className="label-text"><p>Verification Method:</p></span>
                    <input type="text" placeholder="verification method" className="input-bordered" value={verificationMethod} onChange={handleVM}/>
                </div>
                <div id="login-button">
                <button type="button" className="btn btn-primary" onClick={handleLogin} disabled={loading}>
                    {loading ? <p>Creating...</p> : <p>Create</p>}
                </button>
                </div>
                <div id="name_error">
                {nameError ? <p>User Exist! Please try another name.</p>:<p></p>}
                </div>
                <div id="name_empty">
                {bothEmpty ? <p>Please fill in usrname and password!</p>:<p></p>}
                </div>
                <div id="name_empty">
                {passwordEmpty ? <p>Please fill in password!</p>:<p></p>}
                </div>
                <div id="name_empty">
                {nameEmpty ? <p>Please fill in username!</p>:<p></p>}
                </div>
                <div id="name_empty">
                {verificationEmpty ? <p>Please fill in the fragment!</p>:<p></p>}
                </div>
                <div id="DID">
                    <Card id="display-card">
                        {(iotaDID!=="" && iotaDID!=="Repeat") ?
                        <div>
                            <p>Download Your Stronghold File: </p>
                            <button id="download" className="btn btn-outline-dark btn-sm " onClick={downloadSH}>Download</button>
                            <p>Your DID document: </p>
                            <JsonView id="json-word" data={iotaDID} shouldInitiallyExpand={(level) => true} style={defaultStyles} />
                        </div>
                        :<p>
                        Instruction:    
                        </p>}
                     </Card>
                </div>
            </div>
        </div>

    )

}