import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Licencia } from './Licencias';
import { LicenciaChofer } from './ChoferLicencias';

@Entity()
export class Chofer {
  @PrimaryColumn({ length: 12 })
  cedula: string;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 50 })
  apellido1: string;

  @Column({ length: 50 })
  apellido2: string;

  @Column()
  fechaNac: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => LicenciaChofer, (licChof) => licChof.chofer, {
    cascade: ['insert', 'update'],
  })
  licencias: LicenciaChofer[];
}
