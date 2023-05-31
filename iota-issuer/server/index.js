const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');
const { init_issuer, createVC, revocation } = require("./src/index.js")

app.use(cors());
app.use(express.json());


var nextRevocationIdx = 1;  // mark the next index for create VC
var RevocationList = {};  // save the revocation list by dictionary

function deleteItemByValue(dict, value) {
    for (let key in dict) {
        if (dict.hasOwnProperty(key) && dict[key] === value) {
            delete dict[key];
            break;
        }
    }
}

app.post("/create", async (req, res) => {
    //console.log(req.body);
    const subjectName = req.body.name
    const subjectDid = req.body.did
    const record = req.body.record
    const VC = await createVC(issuerName, issuerPassword, subjectName, subjectDid, verificationMethodFragment, revocationFragment, nextRevocationIdx, record)
    RevocationList[subjectName] = nextRevocationIdx
    nextRevocationIdx += 1
    console.log(RevocationList)
    //console.log(VC)
    res.send(VC)
});

app.get("/showRevocationList", (req, res) => {
    res.send(RevocationList)
});


app.post("/revocation", (req, res) => {
    console.log(req.body);
    const revocationIdx = req.body.revocationIdx
    revocation(issuerName, issuerPassword, revocationFragment, parseInt(revocationIdx));
    deleteItemByValue(RevocationList, parseInt(revocationIdx));
    console.log(RevocationList)
});

app.listen(5000, () => {
    console.log("Yey, your server is running on port 5000");
});

const issuerDidPath = "./stronghold-files/issuer.hodl"
const issuerName = "issuer"
const issuerPassword = "123456"
const revocationFragment = "rev-1"
const verificationMethodFragment = "key-1"
init_issuer(issuerName, issuerPassword, issuerDidPath, revocationFragment);
