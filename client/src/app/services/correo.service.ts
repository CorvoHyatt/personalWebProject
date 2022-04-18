import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http: HttpClient) { }

  enviarCorreoRecuperarContraseña(correo: any) {
    return this.http.post(`${environment.API_URI_CORREOS}/enviarCorreoRecuperarContrasena/`, correo);
  }

  decodificarMail(token: any) {
    let dato = {"token": token};
    return this.http.post(`${environment.API_URI_CORREOS}/decodificarMail`,dato);
  }

}
