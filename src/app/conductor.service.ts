import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private apiUrl = 'http://localhost:3000/chofer'; 

  constructor(private http: HttpClient) {}

  guardarConductor(conductorData: any): Observable<any> {
    alert("Llegamos a guardar conductor");
    console.log(conductorData)
    const url = `${this.apiUrl}`;
    return this.http.post(url, conductorData);
  }
}
