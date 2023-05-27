const fs = require("fs");
const { createDID } = require("./createDid");
const { addVerificationMethod } = require("./verificationMethods");
const { addRevocationBitmap } = require("./revocationBitmap");
const { createSignedVerifiableCredential } = require("./verifiableCredentials")
const { revokeVC } = require("./revocation")

// Init issuer setup. Create did, add verification method and create revocation bitmap
async function init_issuer(issuerName, issuerPassword, issuerDidPath, fragment) {
    try {
        if (fs.existsSync(issuerDidPath)) {
            console.log("issuer Did is in stronghold file!")
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