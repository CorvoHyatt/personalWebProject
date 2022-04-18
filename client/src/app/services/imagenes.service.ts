import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private http: HttpClient) { }

  guardarArchivo(src:any,idArticulo:number, indice:any, extension: any){
    return this.http.post(`${environment.API_URI_IMAGENES}/guardarArchivo/`,{'src':src,'idArticulo':idArticulo, "indice":indice,"extension":extension})
  }
}
