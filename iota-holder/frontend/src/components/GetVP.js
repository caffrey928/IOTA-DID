import React from "react";
import instance from "../api";
import downloadFile from "../downloadFileAPI";
import FileDownload from "js-file-download";
const handleClick = async () => {
  instance
    .get("/VP", {
      params: {
        holderName: "kan-test2",
        holderPassword: "kan123",
        credentialFile: "kan-test2-credential.json",
      },
    })
    .then((res) => {
      console.log(res);
      downloadFile
        .get("downloadVP", { params: { name: "kan-test2" } })
        .then((res) => {
          console.log(res);
          FileDownload(res.data, "kan-test2-presentation.json");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
const GetVP = () => {
  return <button onClick={handleClick}>GetVP</button>;
};

export default GetVP;
