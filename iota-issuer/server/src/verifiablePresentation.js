const {
  ProofOptions,
  Account,
  Credential,
  Presentation,
} = require('@iota/identity-wasm/node')
const { loadDID } = require('./loadDid')
const path = require('path')
const { readFileSync, writeFileSync } = require('fs')

/**
 * Creates a verifiable presentation from a verifiable credential. Saves the result in `presentations/<hodlerName>-presentation.json`.
 *
 * @param holderName Name of the holder to determin the Stronghold file in `/stronghold-files/<holderName>.hodl`.
 * @param holderPassword Stronghold password.
 * @param credentialFile Credential file in `credentials/<credentialFile>` for example "alice-credential.json".
 * @param verificationMethodFragment VM with which the presentation will be signed with.
 * @param challenge Challenge what will be included in the presentation before it being signed.
 */
async function createVerifiablePresentation(
  holderName,
  holderPassword,
  credentialFile,
  verificationMethodFragment,
  challenge
) {
  const filePath = path.join('credentials', credentialFile)
  const verifiableCredential = JSON.parse(readFileSync(filePath, 'utf-8'))

  const holder = await loadDID(holderName, holderPassword)

  // Deserialize the credential.
  const receivedVc = Credential.fromJSON(verifiableCredential)

  // Create a Verifiable Presentation from the Credential
  const unsignedVp = new Presentation({
    holder: holder.did(),
    verifiableCredential: receivedVc,
  })

  // Sign the verifiable presentation using the holder's verification method
  // and include the requested challenge and expiry timestamp.
  const signedVp = await holder.createSignedPresentation(
    verificationMethodFragment,
    unsignedVp,
    new ProofOptions({
      challenge,
    })
  )

  const fileNamePresentation = holderName + '-presentation.json'
  const presentationFilePath = path.join('presentations', fileNamePresentation)
  writeFileSync(presentationFilePath, JSON.stringify(signedVp, null, 4))

  console.log('VP was successfully created. see file:')
  console.log(filePath.toString())
}

exports.createVerifiablePresentation = createVerifiablePresentation;