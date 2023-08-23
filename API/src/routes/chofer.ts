import { Router } from "express";
import ChoferController from "../controller/ChoferController";

const routes = Router();

routes.get("", ChoferController.getAll);
routes.get("/:cedula", ChoferController.getById);
routes.post("", ChoferController.add);
routes.delete(
    '/chofer/:cedula/license/:licenseId',
    ChoferController.removeLicense
  );
export default routes;
