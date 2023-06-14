import fs from 'fs';

const checkUsrNameRoute = async (req: any, res: any) => {
  const body = req.body
  const name = body.usrname
  const path = __dirname+"/../../stronghold-files/"+name+".hodl"
  
  if (fs.existsSync(path)) {
    console.log(name)
    res.send("Exist")
  } else {
    res.send("OK")
  }
}
export default checkUsrNameRoute