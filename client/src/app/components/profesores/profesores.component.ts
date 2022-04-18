import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  profesor: Profesor

  constructor(private profesorService: ProfesorService) {
    this.profesor = new Profesor()
  }

  ngOnInit(): void {
  }

  altaProfesor(): void {
    console.log("Entró el profesor", this.profesor)
    this.profesorService.guardarProfesor(this.profesor).subscribe(
      res => { 
        console.log(res)
      }, err => console.error(err));
  }

}
