import * as React from "react";
import { useState, useEffect, CSSProperties } from "react";
import "../css/main_dialog.css";
import background from "../assets/background.jpg";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Verify } from "../api";
import IconButton from "@mui/material/IconButton";
import BarLoader from "react-spinners/BarLoader";

const MainDialog = () => {
  const [challenge, setChallenge] = useState("");
  const [files, setFiles] = useState("");
  const [fileName, setFileName] = useState("");
  const [verified, setVerified] = useState("Not Verified");
  const [tutorial, setTutorial] = useState(false);
  const [loading, setLoading] = useState(false);

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
    try {
      setLoading(true);

      Verify(files, challenge).then((res) => {
        setVerified(res);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      alert("Some Error Occured!");
      setLoading(false);
    }
  };

  const generate_challenge = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";

    // Create an array of 32-bit unsigned integers
    const randomValues = new Uint32Array(length);

    // Generate random values
    window.crypto.getRandomValues(randomValues);
    randomValues.forEach((value) => {
      result += characters.charAt(value % charactersLength);
    });

    setChallenge(result);
  };

  const override: CSSProperties = {
    // display: "in-line",
    margin: "0 auto",
    borderColor: "white",
  };

  const Loader = () => {
    return (
      <>
        <p
          style={{
            fontSize: "18px",
            textAlign: "center",
            marginBottom: "1rem",
          }}>
          Verifying...
        </p>
        <BarLoader
          color="white"
          loading={loading}
          height={5}
          width={150}
          cssOverride={override}
        />
      </>
    );
  };

  const MainPage = () => {
    return (
      <>
        <p className="dialog__text">
          Challenge: {challenge ? challenge : "Click 'Generate Challenge'"}
        </p>
        <p className="dialog__text">
          File: {fileName ? fileName : "Click 'Upload Presentation File'"}
        </p>
        <p className="dialog__text">
          Status: {loading ? <Loader /> : verified}
        </p>

        <button
          className="dialog__button"
          onClick={() => generate_challenge(6)}>
          Generate Challenge
        </button>
        <label className="dialog__fileButton">
          Upload Presentation File
          <input type="file" accept=".json" onChange={handleChange} hidden />
        </label>
        <button className="dialog__button" onClick={handleVerify}>
          Verify
        </button>
      </>
    );
  };

  const TutorialPage = () => {
    return (
      <>
        <p className="tutorial__title">
          Step 1 : <br />{" "}
        </p>
        <p className="tutorial__text">
          Click "Generate Challenge" to get a random challenge.
          <br />
          <br />
          (Showed in "Challenge" field.)
        </p>
        <p className="tutorial__title">
          Step 2 : <br />
        </p>
        <p className="tutorial__text">
          Go to Holder, generate a presentation file with this challenge.
        </p>
        <p className="tutorial__title">
          Step 3 : <br />
        </p>
        <p className="tutorial__text">
          Upload the presentation file (Click "Upload Presentation File").
          <br />
          <br />
          If upload successfully, you can see the file name in "File" field.
        </p>
        <p className="tutorial__title">
          Step 4 : <br />
        </p>
        <p className="tutorial__text">
          Click "Verify" to verify your identity.
          <br />
          <br />
          The result would show up in "Status" field.
        </p>
      </>
    );
  };

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
        <img
          src={background}
          alt="background image"
          className="background__img"
        />

        <div className="dialog__form">
          <div className="grid-container">
            <div />
            <h1 className="dialog__title">
              {tutorial ? "Tutorial" : "Verifier"}
            </h1>
            <div className="dialog__iconbutton">
              <IconButton
                size="large"
                title="Tutorial"
                onClick={() => setTutorial(!tutorial)}>
                {tutorial ? (
                  <CloseIcon className="dialog__icon" />
                ) : (
                  <ErrorOutlineIcon className="dialog__icon" />
                )}
              </IconButton>
            </div>
          </div>
          {tutorial ? <TutorialPage /> : <MainPage />}
        </div>
      </div>
    </>
  );
};

export default MainDialog;
