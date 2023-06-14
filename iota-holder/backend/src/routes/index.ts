import createDIDRoute from "./createDID";
import checkVPRoute from "./checkVP";
import loadDIDRoute from "./loadDID";
import revokeVCRoute from "./Revo";
import VCRoute from "./VC";
import VPRoute from "./VP";
import VMRoute from "./VM";
import DownloadFileRoute from "./DownloadFile";
import uploadFileRoute from "./uploadFile";
import downloadVPRoute from "./downloadVP";
import checkUsrNameRoute from "./checkUsrName";
import removeFileRoute from "./removeFile";
const wrap =
  (fn: any) =>
  (...args: any) =>
    fn(...args).catch(args[2]);

function main(app: any) {
  app.post("/api/createDID", wrap(createDIDRoute));
  app.get("/api/checkVP", wrap(checkVPRoute));
  app.get("/api/loadDID", wrap(loadDIDRoute));
  app.post("/api/revokeVC", wrap(revokeVCRoute));
  app.get("/api/VC", wrap(VCRoute));
  app.get("/api/VP", wrap(VPRoute));
  app.get("/api/downloadSH", wrap(DownloadFileRoute));
  app.post("/api/uploadFile", wrap(uploadFileRoute));
  app.get("/api/downloadVP", wrap(downloadVPRoute));
  app.post("/api/checkUsrName", wrap(checkUsrNameRoute));
  app.post("/api/VM", wrap(VMRoute));
  app.post("/api/removeFile", wrap(removeFileRoute));
}

export default main;
