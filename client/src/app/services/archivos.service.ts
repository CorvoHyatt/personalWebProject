import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(private http: HttpClient) { }

  listArchivosByArticulo(idArticulo:number){
    return this.http.get(`${environment.API_URI}/listArticuloByArticulo/${idArticulo}`);
  }
}
