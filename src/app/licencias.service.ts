import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Licencia } from '../app/choferes/licencias/licencias.component';  // Reemplaza con el modelo adecuado
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LicenciasService {
choferForm: FormGroup;
  constructor(private http: HttpClient) {}

  // Obtener todas las licencias
  getAll(): Observable<Licencia[]> {
    return this.http
      .get<Licencia[]>('http://localhost:3000/licencia')
      .pipe(catchError(this.handlerError));
  }

  // Otras funciones de guardar, modificar, eliminar si son necesarias...

  // Manejo de errores
  handlerError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido, reporte al administrador.';
    if (error?.error) {
      mensaje = error?.error?.mensaje;
    }
    return throwError(() => new Error(mensaje));
  }
}
