import { checkVerifiablePresentation } from '../iota-function/checkVerifiablePresentation'
const checkVPRoute = async (req: any, res: any) => {
  const data = req.query
  const presentationFile = data.presentationFile
  const challenge = data.challenge
  const message = await checkVerifiablePresentation(presentationFile, challenge)
  console.log(message)
  res.send(message)
}
export default checkVPRoute
