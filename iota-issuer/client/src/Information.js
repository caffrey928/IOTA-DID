import React, { useState, useEffect } from 'react';

const Information = ({ onChildDataChange }) => {
    const [info, setInfo] = useState({
        name: "",
        did: ""
    });

    useEffect(() => {
        onChildDataChange(info);
    });

    const handleInputChange = (field, value) => {
        setInfo(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <div>
            <h1> Information </h1>
            <label>Name: </label>
            <input
                type="text"
                onChange={(e) => handleInputChange("name", e.target.value)}
            // value="alice"
            />
            <br></br>
            <label>DID: </label>
            <input
                type="text"
                onChange={(e) => handleInputChange("did", e.target.value)}
            // value="did:iota:9jzsMFSweQxXiS5q1X7rf9qbTjTfZ8U33DomE3xmiuFP"
            />
            <br></br>
        </div>
    );
}

export default Information;