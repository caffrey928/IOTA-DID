import fs from 'fs'
const downloadVPRoute = async (req: any, res: any) => {
  const data = req.query
  console.log(data)
  res.download(`./presentations/${data.name}-presentation.json`)
  //   try {
  //     fs.unlinkSync(`./presentations/${data.name}-presentation.json`)
  //   } catch (err) {
  //     console.log(err)
  //   }
}
export default downloadVPRoute
