import { Component, OnInit } from '@angular/core';
import { Instituto } from 'src/app/models/instituto.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-profesores-vice',
  templateUrl: './profesores-vice.component.html',
  styleUrls: ['./profesores-vice.component.css']
})
export class ProfesoresViceComponent implements OnInit {

  institutoActual: Instituto
  numCarByInst : any // Model
  carreraActual : any
  carreras : any

  constructor(private profesorService: ProfesorService,private carreraService: CarreraService) {
    this.institutoActual = new Instituto();
  }

  ngOnInit(): void {
  }
  cambioInstituto(op: any) {
    console.log('Entro ', op.value)
    this.institutoActual.idInstituto = op.value;
    this.carreraService.listCarreraByInstituto(this.institutoActual.idInstituto).subscribe((resCarreras: any) => {
      console.log(resCarreras);
      this.numCarByInst = resCarreras.length;
      if (this.numCarByInst == 0)
        this.carreraActual = 0
      else {
        this.carreraActual = resCarreras[0].idCarrera;
        this.carreras = resCarreras;
        let dato = {
          'value': this.carreraActual
        }
        this.cambioCarrera(dato);
      }

    },
      err => console.error(err)
    );
  }
  cambioCarrera(op: any) {
    console.log(op)
    this.carreraActual = op.value;
    this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
      console.log(resProfesores);
      //this.profesores = resProfesores;
    },
      err => console.error(err)
    );
  }


}
