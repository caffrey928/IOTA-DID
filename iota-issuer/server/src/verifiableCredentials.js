const {
  ProofOptions,
  Account,
  Credential,
  RevocationBitmap,
} = require('@iota/identity-wasm/node')
const { writeFileSync } = require('fs')
const { loadDID } = require('./loadDid')
const path = require('path')

/**
 * Create a signed `UniversityDegree` credential and saves it to `credentials/<subjectName>-credential.json
 * The issuer also chooses a unique revocation index to be able to revoke the credential later.
 *
 * @param issuerName used to locate the Stronghold file in `/stronghold-files/<issuerName>.hodl`.
 * @param issuerPassword Stronghold password.
 * @param subjectName Name of subject, output file will be `<subjectName>-credential.json`.
 * @param subjectDid DID of subject e.g. `did:iota:abc...zxy`.
 * @param verificationMethodFragment to determin which verification method the VC should be signed with.
 * @param revocationBitmapFragment to determin which revocation list the VC is tied to.
 * @param revocationIndex to determin the index of this credential in the revocation list.
 */
async function createSignedVerifiableCredential(
  issuerName,
  issuerPassword,
  subjectName,
  subjectDid,
  verificationMethodFragment,
  revocationBitmapFragment,
  revocationIndex,
  record
) {
  const issuer = await loadDID(issuerName, issuerPassword)

  console.log(subjectName)
  console.log(subjectDid)

  // Create a credential subject indicating the degree earned by Alice, linked to their DID.
  const subject = {
    id: subjectDid,
    name: subjectName,
    record: record
  }

  // Create an unsigned `UniversityDegree` credential for the subject.
  // The issuer also chooses a unique `RevocationBitmap` index to be able to revoke it later.
  const unsignedVc = new Credential({
    id: 'http://localhost:3000/',
    type: 'VaccineRecord',
    credentialStatus: {
      id: issuer.did() + '#' + revocationBitmapFragment,
      type: RevocationBitmap.type(),
      revocationBitmapIndex: revocationIndex.toString(),
    },
    issuer: issuer.document().id(),
    credentialSubject: subject,
  })

  // Created a signed credential by the issuer.
  const signedVC = await issuer.createSignedCredential(
    verificationMethodFragment,
    unsignedVc,
    ProofOptions.default()
  )

  // const fileName = subjectName + '-credential.json'
  // const filePath = path.join('credentials', fileName)
  // writeFileSync(filePath, JSON.stringify(signedVC, null, 4))

  const VCJson = JSON.stringify(signedVC, null, 4)

  console.log('VC was successfully created. see file:')
  // console.log(filePath.toString())
  return VCJson
}

exports.createSignedVerifiableCredential = createSignedVerifiableCredential;