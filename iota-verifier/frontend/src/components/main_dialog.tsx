import { useState, useEffect } from "react";
import "../css/main_dialog.css"
import background from "../assets/background.jpg"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Verify } from "../api";
import IconButton from "@mui/material/IconButton";

const MainDialog = () => {
    const [challenge, setChallenge] = useState("");
    const [files, setFiles] = useState("");
    const [fileName, setFileName] = useState("");
    const [verified, setVerified] = useState("Not Verified");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        const target = e.target as HTMLInputElement;
    
        if (!target.files) return;
        setFileName(target.files[0].name);
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

    useEffect(() => {
        setVerified("Not Verified");
    }, [challenge, files]);

    useEffect(() => {
        setFileName("");
        setFiles("");
    }, [challenge]);

    return (
        <>
            <div className="page">
                <img src={ background } alt="background image" className="background__img"/>

                <div className="dialog__form">
                    <h1 className="dialog__title">Verifier</h1>
                    <div className="dialog__iconbutton">
                        <IconButton size="large" title="Tutorial" onClick={() => generate_challenge(6)}>
                            <ErrorOutlineIcon className="dialog__icon"/>
                        </IconButton>
                    </div>
                    
                    <p className="dialog__text">Challenge: { challenge ? challenge : "Click 'Generate Challenge'"}</p>
                    <p className="dialog__text">File: {fileName ? fileName : "Click 'Upload Presentation File'"}</p>
                    <p className="dialog__text">Status: {verified}</p>

                    <button className="dialog__button" onClick={() => generate_challenge(6)}>
                        Generate Challenge
                    </button>
                    <label className="dialog__fileButton">
                        Upload Presentation File
                        <input type="file" accept=".json" onChange={handleChange} hidden/>
                    </label>
                    <button className="dialog__button" onClick={handleVerify}>
                        Verify
                    </button>
                </div>
            </div>
        </>
    )
}

export default MainDialog