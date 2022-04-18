import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { Profesor } from '../models/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${environment.API_URI}/profesores/`);
  }

  listOne(idProfesor: number) {
    return this.http.get(`${environment.API_URI}/profesores/${idProfesor}`);
  }

  listAutorByArticulo(idArticulo: number) {
    return this.http.get(`${environment.API_URI}/profesores/listAutorByArticulo/${idArticulo}`);
  }

  listProfesoresByInstituto(idInstituto: number) {
    return this.http.get(`${environment.API_URI}/profesores/listProfesoresByInstituto/${idInstituto}`);
  }

  listProfesoresByCarrera(idCarrera: number) {
    return this.http.get(`${environment.API_URI}/profesores/listProfesoresByCarrera/${idCarrera}`);
  }

  actualizarContrasena(profesor: any) {
    return this.http.post(`${environment.API_URI}/profesores/cambiarContrasena`, profesor);
  }

  guardarProfesor(profesor: Profesor) {
    return this.http.post(`${environment.API_URI}/profesores/create`, profesor);
  }

  getProfesor(idProfesor: number) {
    return this.http.get(`${environment.API_URI}/profesores/${idProfesor}`);
  }

  getProfesoresByArticulo(idArticulo: number) {
    return this.http.get(`${environment.API_URI}/profesores/profesoresByArticulo/${idArticulo}`);
  }
  tipoProfesor() {
    return this.http.get(`${environment.API_URI}/profesores/tipoProfesor`);
  }
  actualizarProfesor(profesor: Profesor) {
    return this.http.put(`${environment.API_URI}/profesores/update/${profesor.idProfesor}`, profesor)
  }
  borrarProfesor(idProfesor: number) {
    return this.http.delete(`${environment.API_URI}/profesores/delete/${idProfesor}`)
  }
}