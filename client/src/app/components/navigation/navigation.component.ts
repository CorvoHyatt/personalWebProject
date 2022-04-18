import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Carrera } from 'src/app/models/carrera.model'
import { Instituto } from 'src/app/models/instituto.model'
import { Profesor } from 'src/app/models/profesor.model'
import { TipoProfesor } from 'src/app/models/tipoProfesor.model'
import { CarreraService } from 'src/app/services/carrera.service'
import { InstitutoService } from 'src/app/services/instituto.service'
import { ProfesorService } from 'src/app/services/profesor.service'
import { TipoProfesorService } from 'src/app/services/tipo-profesor.service'
import Swal from 'sweetalert2'
declare var $: any
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  profesor: Profesor
  idProfesor: number
  nivelProfesorSesion: number
  carreras: Carrera[]
  tipoProfesor: TipoProfesor[]
  institutos: Instituto[]
  carreraActual: any;
  institutoActual: any;
  numCarByInst: any;
  location: any;

  constructor(
    private router: Router,
    private carreraService: CarreraService,
    private institutoService: InstitutoService,
    private tipoProfesorService: TipoProfesorService,
    private profesorService: ProfesorService
  ) {

    this.idProfesor = 0
    this.nivelProfesorSesion = 0
    this.profesor = new Profesor();
    this.carreras = []
    this.tipoProfesor = []
    this.institutos = []
    this.location = location.href;
  }

  ngOnInit(): void {
    this.idProfesor = Number(localStorage.getItem('idProfesor'))
    this.nivelProfesorSesion = Number(localStorage.getItem('nivel'))
    console.log("nivel del profesor:", this.nivelProfesorSesion)
    $(document).ready(function () {
      $('.sidenav').sidenav()
      $(".dropdown-trigger").dropdown({ coverTrigger: false })
    })

  }


  logout() {
    localStorage.removeItem("correo");
    localStorage.removeItem("token");
    localStorage.removeItem("idProfesor");
    this.router.navigateByUrl('/');
  }

  altaProfesor() {
    $('#altaProfesor').modal({ dismissible: false });
    $('#altaProfesor').modal('open');
    this.profesor.idInstituto = 1;
    this.profesor.idTipoProfesor = 1
    this.profesor.idCarrera = 4

    this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {

      this.institutos = resInstitutos;

    }, err => console.error(err))

    this.carreraService.listCarreraByInstituto(1).subscribe((resCarrera: any) => {

      this.carreras = resCarrera;

    }, err => console.error(err))

    this.tipoProfesorService.listTipoProfesor().subscribe((resTipo: any) => {

      this.tipoProfesor = resTipo;
      console.log(this.tipoProfesor);

    }, err => console.error(err))

  }

  cambioCarrera(op: any) {
    this.profesor.idCarrera = Number(op.value)
  }

  cambioTipoProfesor(op: any) {
    this.profesor.idTipoProfesor = Number(op.value);

  }

  cambioInstituto(op: any) {

    this.profesor.idInstituto = Number(op.value);
    this.carreraService.listCarreraByInstituto(this.profesor.idInstituto).subscribe((resCarreras: any) => {

      this.numCarByInst = resCarreras.length;
      if (this.numCarByInst == 0)
        this.profesor.idCarrera = 0
      else {
        this.profesor.idCarrera = resCarreras[0].idCarrera;
        this.carreras = resCarreras;
        let dato = {
          'value': this.profesor.idCarrera
        }
        this.cambioCarrera(dato);
      }

    },
      err => console.error(err)
    );

  }


  darAltaProfesor() {

    this.profesorService.guardarProfesor(this.profesor).subscribe((resProf) => {
    }, err => console.error(err))
    $('#altaProfesor').modal({ dismissible: false });
    $('#altaProfesor').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Profesor Agregado',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    })
    if(this.location == 'http://localhost:4200/home/listarProfesores/' + this.idProfesor){
			document.location.reload()
		}
  }




}
