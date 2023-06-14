import { createDID } from '../iota-function/createDid'
import { addVerificationMethod } from '../iota-function/verificationMethods'
import fs from 'fs';
import { loadDID } from "../iota-function/loadDid";
const createDIDRoute = async (req: any, res: any) => {
  console.log(req.body)
  const body = req.body
  const userName = body.userName
  const password = body.password
  const verificationMethod = body.verificationMethod
  console.log(userName, password, verificationMethod)
  const path = __dirname+"/../../stronghold-files/"+userName+".hodl"

  if (fs.existsSync(path)) {
    res.send("Repeat")
  }else{
    const didData = await createDID(userName, password)
    // console.log(didData)
    console.log(verificationMethod)
    if(verificationMethod!==""){
      const message = await addVerificationMethod(userName, password, verificationMethod)
      console.log(message)
    }
    const account = await loadDID(userName, password);
    res.send(account.document());
  }
}
export default createDIDRoute
