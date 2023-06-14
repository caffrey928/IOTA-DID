import { addVerificationMethod } from "../iota-function/verificationMethods";
const VMRoute = async (req: any, res: any) => {
  console.log("req.body", req.body);
  const body = req.body;
  const userName = body.name;
  const password = body.password;
  const fragment = body.fragment;
  const message = await addVerificationMethod(userName, password, fragment);
  console.log(message);
  res.send(message);
};
export default VMRoute;
