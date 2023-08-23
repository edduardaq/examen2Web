import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chofer } from "./Chofer";
import { Licencia } from "./Licencias";

@Entity()
export class LicenciaChofer {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Chofer, (chofer) => chofer.licencias)
  chofer: Chofer;

  @ManyToOne(() => Licencia, (lic) => lic.choferes)
  licencia: Licencia;
}
