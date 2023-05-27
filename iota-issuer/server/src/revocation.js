const { Account } = require('@iota/identity-wasm/node')
const { loadDID } = require('./loadDid')
/**
 * Revokes a verifiable credential inside a recovation list.
 * 
 * @param issuerName used to get DID from a Stronghold located in `stronhold-files/<issuerName>.hodl`.
 * @param issuerPassword Stronghold password.
 * @param revocationBitmapFragment  Fragment to identify which revocation bitmap to target.
 * @param indexToRevoke Index of the VC to be revoked.
 */
async function revokeVC(
  issuerName,
  issuerPassword,
  revocationBitmapFragment,
  indexToRevoke
) {
  const issuer = await loadDID(issuerName, issuerPassword)
  await issuer.revokeCredentials(revocationBitmapFragment, indexToRevoke)
  console.log('Revocation successful.')
}

exports.revokeVC = revokeVC;

