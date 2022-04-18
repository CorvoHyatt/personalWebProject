import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { Articulo } from '../models/articulo.model';


@Injectable({
	providedIn: 'root'
})
export class ArticuloService {

	constructor(private http: HttpClient) { }

	listByProfesor(idProfesor: number) {
		return this.http.get(`${environment.API_URI}/articulo/${idProfesor}`);
	}
	listByPeriodo(ini: any, fin: any) {
		console.log(ini, fin)
		return this.http.get(`${environment.API_URI}/articulo/${ini}/${fin}`);
	}
	create(articulo: any, idProfesor:number) {
		return this.http.post(`${environment.API_URI}/articulo/create/${idProfesor}`, articulo);
	}

	articulosByProfesor(idProfesor: number,ini: any, fin: any) {
		return this.http.get(`${environment.API_URI}/articulo/${idProfesor}/${ini}/${fin}`);

	}
	articulosByInstituto(idInstituto:any){
		return this.http.get(`${environment.API_URI}/Articulo/articulosByInstituto/${idInstituto}/`);
	}
	update(idArticulo: number, articulo: Articulo){
		return this.http.put(`${environment.API_URI}/Articulo/update/${idArticulo}`,articulo);
	}
}