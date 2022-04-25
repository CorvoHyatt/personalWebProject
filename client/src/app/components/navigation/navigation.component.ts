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
import * as XLSX from 'xlsx'

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
  file: any
  uploadEvent: any
  arrayBuffer: any



  exceljsondata: any



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
      $(".dropdown-trigger").dropdown({ coverTrigger: false,
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: ($('.dropdown-content').width() * 2.7) / 2.5 + 2, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
      })
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
    }).then(() => {
      if (this.location == 'http://localhost:4200/home/listarProfesores/' + this.idProfesor) {
        document.location.reload()
      }
    })
  }

  cargarExcelProfesor(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log("Entre:", this.file);
      this.uploadEvent = event;
    }
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      console.log("fileReader.result", fileReader.result);
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      console.log("arr:", arr);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      console.log(workbook);
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      console.log(this.exceljsondata);
    }
  }

  importarProfesor() {
    $('#importarProfesor').modal({ dismissible: false });
    $('#importarProfesor').modal('open');
  }

  fimportarProfesor() {

    this.exceljsondata.map((profesor: any) => {

      console.log(profesor);
      this.profesorService.guardarProfesor(profesor).subscribe((resProfesor) =>{},err =>{console.log(err);})
    })

    $('#migrarProfesor').modal({ dismissible: false });
    $('#migrarProfesor').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Profesores Migrados',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    }).then(() => {
      if (this.location == 'http://localhost:4200/home/listarProfesores/' + this.idProfesor) {
        document.location.reload()
      }
    })

  }



}
