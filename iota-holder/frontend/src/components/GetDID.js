import React from "react";
import instance from "../api";
const handleClick = async () => {
  instance
    .get("/loadDID", { params: { name: "kan-test3", password: "kan123" } })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const GetDID = () => {
  return <button onClick={handleClick}>GetDID</button>;
};

export default GetDID;
