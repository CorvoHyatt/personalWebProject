import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carrera } from '../models/carrera.model';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http: HttpClient) { }
  
  listCarreraByInstituto(idInstituto: number) {
    return this.http.get(`${environment.API_URI}/carreras/getCarrerasByInstituto/${idInstituto}`);
  }

  listOne(idCarrera:number){
    return this.http.get(`${environment.API_URI}/carreras/${idCarrera}`);
  }
  listCarreras(){
    return this.http.get(`${environment.API_URI}/carreras/`)
  }
  update(idCarrera: number, articulo: Carrera){
		return this.http.put(`${environment.API_URI}/Articulo/update/${idCarrera}`,articulo);
	}
  borrarCarrera(idCarrera: number) {
    return this.http.delete(`${environment.API_URI}/profesores/delete/${idCarrera}`)
  }
}

