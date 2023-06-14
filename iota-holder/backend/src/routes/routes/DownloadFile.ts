const DownloadFileRoute = async (req: any, res: any) => {
  const data = req.query
  console.log(data)
  res.download(`./stronghold-files/${data.name}.hodl`)
}
export default DownloadFileRoute
