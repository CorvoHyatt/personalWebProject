import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private http: HttpClient) { }

  existe(usuario:any) {
    console.log('Entrando al servicio existe :)', usuario)
    return this.http.post(`${environment.API_URI}/profesores/existe`,usuario);
  }

  // crear(profesor: any) {

  // }


}