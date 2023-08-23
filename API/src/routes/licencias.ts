import { Router } from "express";
import LicenciaController from "../controller/LicenciasController";

const routes = Router();

routes.get("", LicenciaController.getAll);

export default routes;
