import { Router } from "express";
import chofer from "./chofer";
import licencias from "./licencias";

const routes = Router();

routes.use("/chofer", chofer);
routes.use("/licencia", licencias);
export default routes;
