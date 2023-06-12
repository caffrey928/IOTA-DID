const fs = require("fs");
const { createDID } = require("./createDid");
const { addVerificationMethod } = require("./verificationMethods");
const { addRevocationBitmap } = require("./revocationBitmap");
const { createSignedVerifiableCredential } = require("./verifiableCredentials")
const { revokeVC } = require("./revocation")

function writeData(path, revocationList, nextIdx) {
    let save = {
        revocationList: revocationList,
        nextIdx: nextIdx
    }
    let saveJson = JSON.stringify(save)
    fs.writeFile(path, saveJson, (error) => {
        if (error) {
            console.error(error);
            throw error;
        }
        console.log("save.json written correctly");
    });
}

async function readData(path) {
    try {
        let saveJson = await fs.promises.readFile(path);
        let save = JSON.parse(saveJson);
        console.log("save.json read correctly");
        return save;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Init issuer setup. Create did, add verification method and create revocation bitmap
async function init_issuer(issuerName, issuerPassword, issuerDidPath, fragment) {
    try {
        if (fs.existsSync(issuerDidPath)) {
            console.log("issuer Did is in stronghold file!")

            if (fs.existsSync("save.json")) {
                let save = await readData("save.json");
                console.log(save);
                return save
            }
            else {
                // console.error("did not have save!")
                // const revocationList = {}
                // const nextIdx = 1
                // writeData("save.json", revocationList, nextIdx)
                // let save = await readData("save.json");
                // console.log(save);
                // return save
                console.error("did not have save!")
            }
        }
        else {
            console.log("issuer Did is not in stronghold file!")
            await createDID(issuerName, issuerPassword)
            await addVerificationMethod(issuerName, issuerPassword, "key-1")
            await addRevocationBitmap(
                issuerName,
                issuerPassword,
                fragment
            )
            const revocationList = {}
            const nextIdx = 1
            writeData("save.json", revocationList, nextIdx)
            let save = await readData("save.json");
            console.log(save);
            return save
        }
    } catch (err) {
        console.error(err)
    }
}

// Create verifiable credential
async function createVC(issuerName,
    issuerPassword,
    subjectName,
    subjectDid,
    verificationMethodFragment,
    revocationBitmapFragment,
    revocationIndex,
    record) {

    const VCJson = await createSignedVerifiableCredential(issuerName,
        issuerPassword,
        subjectName,
        subjectDid,
        verificationMethodFragment,
        revocationBitmapFragment,
        revocationIndex,
        record);
    return VCJson
}

// Revocation
async function revocation(issuerName,
    issuerPassword,
    revocationBitmapFragment,
    revocationIndex) {

    await revokeVC(issuerName, issuerPassword, revocationBitmapFragment, revocationIndex)
}

exports.init_issuer = init_issuer;
exports.createVC = createVC;
exports.revocation = revocation;
exports.writeData = writeData;
exports.readData = readData;
