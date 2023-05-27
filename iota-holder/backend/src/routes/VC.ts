import { createSignedVerifiableCredential } from '../iota-function/verifiableCredentials'
const VCRoute = async (req: any, res: any) => {
  const data = req.query
  const issuerName = data.issuerName
  const issuerPassword = data.issuerPassword
  const subjectName = data.subjectName
  const subjectDid = data.subjectDid
  const verificationMethodFragment = data.verificationMethodFragment
  const revocationBitmapFragment = data.revocationBitmapFragment
  const revocationIndex = data.revocationIndex
  const credentialSubject = data.credentialSubject
  const message = await createSignedVerifiableCredential(
    issuerName,
    issuerPassword,
    subjectName,
    subjectDid,
    verificationMethodFragment,
    revocationBitmapFragment,
    revocationIndex,
    credentialSubject
  )
  console.log(message)
  res.send(message)
}
export default VCRoute
