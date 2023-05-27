import { revokeVC } from '../iota-function/revocation'
const revokeVCRoute = async (req: any, res: any) => {
  console.log(req.body)
  const body = req.body
  const issuerName = body.issuerName
  const issuerPassword = body.issuerPassword
  const revocationBitmapFragment = body.revocationBitmapFragment
  const indexToRevoke = body.indexToRevoke
  console.log(body)
  const message = await revokeVC(
    issuerName,
    issuerPassword,
    revocationBitmapFragment,
    indexToRevoke
  )
  console.log(message)
  res.send(message)
}
export default revokeVCRoute
