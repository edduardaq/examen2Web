import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chofer } from "./Chofer";
import { LicenciaChofer } from "./ChoferLicencias";

@Entity()
export class Licencia {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => LicenciaChofer, (licChofer) => licChofer.licencia)
  choferes: LicenciaChofer[];
}
