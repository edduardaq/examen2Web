import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Licencia } from "../entity/Licencias";

class LicenciaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const licRepo = AppDataSource.getRepository(Licencia);
      const lista = await licRepo.find({
        where: { estado: true },
      });
      if (lista.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(lista);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };
}

export default LicenciaController;
