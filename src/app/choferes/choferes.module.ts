import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoferesComponent } from './choferes/choferes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LicenciasComponent } from './licencias/licencias.component';

@NgModule({
  declarations: [ChoferesComponent, LicenciasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ChoferesComponent]
})
export class ChoferesModule { }
