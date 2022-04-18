import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrera } from 'src/app/models/carrera.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

  idProfesor: number
  profesor: Profesor
  carrera: Carrera
  instituto: Instituto



  constructor(
    private route: ActivatedRoute,
    private profesorService: ProfesorService,
    private carreraService: CarreraService,
    private institutoService: InstitutoService
  ) {
    this.idProfesor = 0
    this.profesor = new Profesor()
    this.carrera = new Carrera()
    this.instituto = new Instituto()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idProfesor = Number(params.get('idProfesor'))
      this.profesorService.getProfesor(this.idProfesor).subscribe((resProfesor: any) => {
        this.profesor = resProfesor
        console.log(this.profesor)
      },
        err => console.error(err)
      );
    })
    this.institutoService.listOne(this.profesor.idInstituto).subscribe((resInstituto: any) => {
      this.instituto = resInstituto
    }, err => console.error(err))

    this.carreraService.listOne(this.profesor.idCarrera).subscribe((resCarrera: any) => {
      this.carrera = resCarrera;
    }, err => console.error(err))
  }

  actualizarP() {
    this.profesorService.actualizarProfesor(this.profesor).subscribe((resProf: any) => {
      console.log(resProf)
    })
    $('#editarProf').modal({ dismissible: false });
		$('#editarProf').modal('close');
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Datos Modificados',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		})
  }

}
