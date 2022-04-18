import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoProfesorService {

  constructor(private http: HttpClient) { }

  listTipoProfesor(){
    return this.http.get(`${environment.API_URI}/tipoprofesor/`)
  }

}
