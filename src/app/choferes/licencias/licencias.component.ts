import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LicenciasService } from 'src/app/licencias.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-licencias',
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.scss'],
})
export class LicenciasComponent implements OnInit {
  @Output() licenciaSeleccionada = new EventEmitter<number>();
  @Output() licenciaDuplicada = new EventEmitter<void>();
  @Input() chofer: Licencia[];
  @Output() licenseSelected = new EventEmitter<number>();
  selectedLicenses: number[] = [];
  @Output() licenciaEliminada = new EventEmitter<number>();
  @Input() todasLasLicencias: Licencia[];
  @Input() datosGuardados: boolean;
  

  selectLicense(licenciaId: number): void {
    if (this.isLicenseDuplicated(licenciaId)) {
      this.licenciaDuplicada.emit();
    } else {
      this.licenciaSeleccionada.emit(licenciaId);
      this.popupVisible = false;
    }
  }
  
  isLicenseDuplicated(licenciaId: number): boolean {
    return this.selectedLicenses.includes(licenciaId);
  }
  
  
  getLicenciaNombre(licenciaId: number): string {
    const licencia = this.todasLasLicencias && this.todasLasLicencias.find(lic => lic.id === licenciaId);
    return licencia ? licencia.nombre : '';
  }
  
  
  

  
  

  constructor(private licenciasService: LicenciasService, private toastr: ToastrService) {}

  ngOnInit(): void {


    
    this.licenciasService.getAll().subscribe((licencias: Licencia[]) => {
      // Asume que la respuesta es una matriz de objetos de licencia
      this.todasLasLicencias = licencias.filter((licencia) => licencia.estado === true); // Cambia esto a true
    });
  }
  
  // Variable para mostrar u ocultar el popup de licencias
  popupVisible = false;

  // Mostrar el popup de licencias
  mostrarLicencias() {
    this.popupVisible = true;
  }

  // Agregar una licencia seleccionada a la lista de licencias del chofer
  // Agregar una licencia seleccionada a la lista de licencias del chofer
  agregarLicencia(licencia: Licencia) {
    const licenciaId = licencia.id;
    if (!this.chofer.some(l => l.id === licenciaId)) {
      this.chofer.push(licencia);
      this.licenciaSeleccionada.emit(licenciaId);
    } else {
      this.toastr.error('La licencia ya ha sido seleccionada. No puede seleccionar la misma licencia dos veces.');
    }
    this.popupVisible = false;
  }
  
  eliminarLicencia(event: Event, licenciaId: number) {
    event.preventDefault();
    event.stopPropagation();
    this.chofer = this.chofer.filter((licencia: Licencia) => licencia.id !== licenciaId);
    this.licenciaEliminada.emit(licenciaId);
  }
  
  
  
  
  


  
  
}

export interface Licencia {
  id: number;
  nombre: string;
  estado: boolean;
}
