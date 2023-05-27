import React, { useState } from 'react';
import instance from "../api";
import Card from 'react-bootstrap/Card';
import { JsonView, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nameEmpty, setNameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [bothEmpty, setBothEmpty] = useState(false);
    const [iotaDID, setIotaDID] = useState("")
    const handleUsername = (e) => {
        setUsername(e.target.value);
      }; 
    const handlePassword = (e) => {
        setPassword(e.target.value);
      };
    const handleLogin = (e) => {
        setLoading(true);
        setNameError(false);
        setNameEmpty(false)
        setPasswordEmpty(false)
        setBothEmpty(false)
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
                if(res.data==="Exist"){
                    setNameError(true);
                }
            })
            .finally(()=>{
                console.log(nameError)
                if(nameError!==true){
                    instance
                    .post("/createDID", {
                        userName: username,
                        password: password,
                    })
                    .then((res) => {
                        console.log(res);
                        if(res.data !=="Repeat"){
                            setIotaDID(res.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(()=>{
                        setLoading(false);
                    });
                }else{
                    setLoading(false);
                }

            });
        }
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
                    <input type="text" placeholder="password" className="input-bordered" value={password} onChange={handlePassword}/>
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
                <div id="DID">
                    <Card id="display-card">
                        {(iotaDID!=="" && iotaDID!=="Repeat") ?
                        <JsonView id="json-word" data={iotaDID} shouldInitiallyExpand={(level) => true} style={defaultStyles} />
                        :<p></p>}
                     </Card>
                </div>
            </div>
        </div>

    )

}