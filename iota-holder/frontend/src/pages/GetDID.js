import React, { useState } from 'react';
import instance from "../api";
import Card from 'react-bootstrap/Card';
import { JsonView, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export default function Login(){
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
    const [iotaDID, setIotaDID] = useState("")
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
        setNameError(false);
        setNameEmpty(false);
        setPasswordEmpty(false);
        setBothEmpty(false);
        setPasswordError(false);
        setIotaDID("")
        if(password==="" && username===""){
            setBothEmpty(true)
            setLoading(false);
        }else if(password===""){
            setPasswordEmpty(true)
            setLoading(false);
        }else if(username===""){
            setNameEmpty(true)
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
                if(res.data!=="Exist"){
                    setNameError(true);
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
                        setPasswordError(true);
                        setLoading(false);
                    });
                }else{
                    setLoading(false);
                }
            })
            
        }
    };
    function changePasswordType(e) {
        if (password.type === "password") {
          password.type = "text";
        } else {
          password.type = "password";
        }
      }

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
                <div id="login-button">
                <button type="button" className="btn btn-primary" onClick={handleLogin} disabled={loading}>
                    {loading ? <p>Geting...</p> : <p>Get</p>}
                </button>
                </div>
                <div id="name_error">
                {nameError ? <p>User does not Exist! Please try another name.</p>:<p></p>}
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
                {passwordError ? <p>Wrong passwrd!</p>:<p></p>}
                </div>
                <div id="DID">
                    <Card id="display-card">
                        {(iotaDID!=="") ?
                        <JsonView id="json-word" data={iotaDID} shouldInitiallyExpand={(level) => true} style={defaultStyles} />
                        :<p>
                        Instruction:    
                        </p>}
                     </Card>
                </div>
            </div>
        </div>

    )

}