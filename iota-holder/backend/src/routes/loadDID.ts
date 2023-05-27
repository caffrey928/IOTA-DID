import { loadDID } from '../iota-function/loadDid'
const loadDIDRoute = async (req: any, res: any) => {
  const data = req.query
  const name = data.name
  const password = data.password
  const account = await loadDID(name, password, true)
  console.log(account.document().id())
  res.send(account.document().id())
}
export default loadDIDRoute
