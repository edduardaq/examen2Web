import "reflect-metadata";
import { DataSource } from "typeorm";
import { Chofer } from "./entity/Chofer";
import { Licencia } from "./entity/Licencias";
import { LicenciaChofer } from "./entity/ChoferLicencias";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "examen2db",
  synchronize: true,
  logging: false,
  entities: [Chofer, Licencia, LicenciaChofer],
  migrations: [],
  subscribers: [],
});
