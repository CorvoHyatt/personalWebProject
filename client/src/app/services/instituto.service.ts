import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Instituto } from '../models/instituto.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  constructor(private http: HttpClient) { }

  
  listInstitutos() {
    return this.http.get(`${environment.API_URI}/institutos/`);
  }
  listOne(idInstituto: number){
    return this.http.get(`${environment.API_URI}/institutos/${idInstituto}`);
  }
  delete(idInstituto: number) {
    return this.http.delete(`${environment.API_URI}/institutos/delete/${idInstituto}`);
  }
  update(instituto: Instituto) {
    return this.http.put(`${environment.API_URI}/profesores/update/${instituto.idInstituto}`, instituto)
  }
}
