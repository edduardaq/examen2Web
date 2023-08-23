import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { ConductorService } from 'src/app/conductor.service';
import { Licencia } from '../licencias/licencias.component';

export function licenciasRequeridas(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const licenciasSeleccionadas = control.value;
    if (!licenciasSeleccionadas || licenciasSeleccionadas.length === 0) {
      return { sinLicencias: true };
    }
    return null;
  };
}

function validateFechaNacimiento(control: AbstractControl): { [key: string]: any } | null {
  const fechaNacimiento = new Date(control.value);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  if (edad < 18 || (edad === 18 && hoy.getMonth() < fechaNacimiento.getMonth()) || (edad === 18 && hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())) {
    return { menorDeEdad: true };
  }
  return null;
}

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss']
})
export class ChoferesComponent implements OnInit {
  chofer: Licencia[] = [];
  choferForm: FormGroup;
  selectedLicenses: number[] = [];
  @Input() todasLasLicencias: Licencia[];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private conductorService: ConductorService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.choferForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, validateFechaNacimiento]],
      licencias: [[], licenciasRequeridas()],
      cedula: ['', Validators.required]
    });
  }

  licenciaSeleccionada(licenciaId: number) {
    console.log('Licencia seleccionada:', licenciaId);
    if (this.choferForm) {
      if (this.isLicenseDuplicated(licenciaId) === false) {
        this.selectedLicenses.push(licenciaId);
        this.choferForm.get('licencias')?.setValue(this.selectedLicenses);
      } else {
        this.snackBar.open('Licencia ya seleccionada', 'Cerrar', {
          duration: 3000,
        });
        console.log('Licencia ya seleccionada:', licenciaId);
      }
    }
  }
  
  

  isLicenseDuplicated(licenciaId: number): boolean {
    return this.selectedLicenses.includes(licenciaId);
  }

  licenciaEliminada(licenciaId: number) {
    const licenciasControl = this.choferForm.get('licencias');
    if (licenciasControl) {
      const licencias = licenciasControl.value;
      const index = licencias.indexOf(licenciaId);
      if (index > -1) {
        licencias.splice(index, 1);
        licenciasControl.setValue(licencias);
        this.toastr.success('Licencia eliminada con éxito');
      } else {
        this.toastr.error('Licencia no encontrada');
      }
    }
  }
  
  
  getLicenciaNombre(licenciaId: number): string {
    const licencia = this.todasLasLicencias.find(lic => lic.id === licenciaId);
    return licencia ? licencia.nombre : 'Licencia no encontrada';
  }
  

  actualizarLicencias(licenciaId: number) {
    const licencias = this.choferForm.get('licencias')?.value.filter((id: number) => id !== licenciaId);
    this.choferForm.patchValue({ licencias: licencias });
  }

  
  
  datosGuardados = false;
  restablecerLicencias() {
    this.selectedLicenses = [];
    this.choferForm.get('licencias')?.reset(this.selectedLicenses);
  }

  
  guardarChoferData() {
    if (this.choferForm.valid) {
      const formValue = this.choferForm.value;
      
      const choferData = {
        cedula: formValue.cedula,
        nombre: formValue.nombre,
        apellido1: formValue.apellido1,
        apellido2: formValue.apellido2,
        fechaNac: formValue.fechaNacimiento, // Asegúrate de que este es el nombre correcto del campo de fecha de nacimiento en tu formulario
        estado: 1,
        licencias: formValue.licencias.map((id: number) => ({ id })) // Convierte el array de números a un array de objetos.
      };
      console.log(choferData);
      this.conductorService.guardarConductor(choferData).subscribe(
        (response) => {
          
                  console.log('Conductor guardado:', response);
          this.toastr.success('Conductor guardado con éxito');
        },
        (error) => {
          const mensajeError = error.error.mensaje;
      console.error('Error al guardar el conductor:', mensajeError);
      this.toastr.error(mensajeError);
      alert(mensajeError);
        }
      );
    } else {
      console.log('Errores en el formulario:', this.choferForm.errors);
      console.log('Estado del formulario:', this.choferForm.status);
      Object.keys(this.choferForm.controls).forEach(key => {
        const controlErrors = this.choferForm.get(key)?.errors;
        if (controlErrors) {
          console.log('Errores en el control', key, controlErrors);
        }
      });
  
      // Muestra mensajes de error si el formulario no es válido.
      if (this.choferForm?.get('nombre')?.hasError('required')) {
        this.toastr.error('El nombre es requerido');
      }
      if (this.choferForm?.get('apellido1')?.hasError('required')) {
        this.toastr.error('El primer apellido es requerido');
      }
      if (this.choferForm?.get('apellido2')?.hasError('required')) {
        this.toastr.error('El segundo apellido es requerido');
      }
      if (this.choferForm?.get('fechaNacimiento')?.hasError('required')) {
        this.toastr.error('La fecha de nacimiento es requerida');
      }
      if (this.choferForm?.get('fechaNacimiento')?.hasError('menorDeEdad')) {
        this.toastr.error('El chofer debe ser mayor de edad');
      }
      if (this.choferForm?.get('licencias')?.value.length === 0) {
        this.toastr.error('Debe seleccionar al menos una licencia');
      }
    }
  }
  
  
  
}
