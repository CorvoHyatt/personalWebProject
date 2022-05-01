import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Carrera } from 'src/app/models/carrera.model'
import { Instituto } from 'src/app/models/instituto.model'
import { Profesor } from 'src/app/models/profesor.model'
import { TipoProfesor } from 'src/app/models/tipoProfesor.model'
import { ArticuloService } from 'src/app/services/articulo.service'
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
  niveles:any[] = ["Vice Rector","Director de Instituto", "Jefe de Carrera", "Profesor"]


  constructor(
    private router: Router,
    private articuloService: ArticuloService,
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
      $(".dropdown-trigger").dropdown({ coverTrigger: false, })
    })
  }
  
  
  logout() {
    localStorage.removeItem("correo");
    localStorage.removeItem("token");
    localStorage.removeItem("idProfesor");
    this.router.navigateByUrl('/');
  }
  
  
  //-------------------------------- Cambio Carrera, TipoP e Instituto --------------------------------
  cambioCarrera(op: any) {
    this.profesor.idCarrera = Number(op.value)
  }

  cambioTipoProfesor(op: any) {
    this.profesor.idTipoProfesor = Number(op.value);
  }

	cambioNivel(op: any) {
    this.profesor.nivel = Number(op.value) + 1;
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
  
  //-------------------------------- Alta Profesor --------------------------------
  altaProfesor() {
    $('#altaProfesor').modal({ dismissible: false });
    $('#altaProfesor').modal('open');
    this.profesor.idInstituto = 1;
    this.profesor.idTipoProfesor = 1
    this.profesor.idCarrera = 4;

    this.institutoService.list().subscribe((resInstitutos: any) => {

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

  //-------------------------------- Cargar Excel --------------------------------

  cargarExcel(event: any) {
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


  //-------------------------------- Importar Profesor --------------------------------
  importarProfesor() {
    $('#importarProfesor').modal({ dismissible: false });
    $('#importarProfesor').modal('open');
  }
  fImportarProfesor() {

    this.exceljsondata.map((profesor: any) => {

      this.profesorService.guardarProfesor(profesor).subscribe((resProfesor) => { }, err => { console.log(err); })
    })

    $('#importarProfesor').modal({ dismissible: false });
    $('#importarProfesor').modal('close');
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

  
  //-------------------------------- Importar Articulo --------------------------------
  importarArticulo() {
    $('#importarArticulo').modal({ dismissible: false });
    $('#importarArticulo').modal('open');
  }
  
  fImportarArticulo() {
    this.exceljsondata.map((articulo:any) =>{
      this.articuloService.create(articulo,this.idProfesor).subscribe((resArt:any) =>{}, err =>{console.log(err);})
    })

    $('#importarArticulo').modal({ dismissible: false });
    $('#importarArticulo').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Articulos Migrados',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    }).then(() => {
      if (this.location == 'http://localhost:4200/home/articulos/' + this.idProfesor) {
        document.location.reload()
      }
    })
  }

  //-------------------------------- Importar Eventos --------------------------------
  importarEventos() {
    $('#importarEventos').modal({ dismissible: false });
    $('#importarEventos').modal('open');
  }
  
  fImportarEventos() {
    this.exceljsondata.map((eventos:any) =>{
      // this.articuloService.create(articulo,this.idProfesor).subscribe((resArt:any) =>{}, err =>{console.log(err);})
    })
    $('#importarEventos').modal({ dismissible: false });
    $('#importarEventos').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Eventos Migrados',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    })
  }

  //-------------------------------- Importar Institutos --------------------------------
  importarInstitutos() {
    $('#importarInstitutos').modal({ dismissible: false });
    $('#importarInstitutos').modal('open');
  }
  
  fImportarInstitutos() {
    this.exceljsondata.map((institutos:any) =>{
      this.institutoService.create(institutos).subscribe((resArt:any) =>{}, err =>{console.log(err);})
    })
    $('#importarInstitutos').modal({ dismissible: false });
    $('#importarInstitutos').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Eventos Migrados',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    })
  }

  //-------------------------------- Importar Carreras --------------------------------
  importarCarreras() {
    $('#importarCarreras').modal({ dismissible: false });
    $('#importarCarreras').modal('open');
  }
  
  fImportarCarreras() {
    this.exceljsondata.map((carreras:any) =>{
      this.carreraService.create(carreras).subscribe((resArt:any) =>{}, err =>{console.log(err);})
    })
    $('#importarCarreras').modal({ dismissible: false });
    $('#importarCarreras').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Carreras Migradas',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    })
  }

  //-------------------------------- Importar Profesor y Articulo --------------------------------
  importarPyA() {
    $('#importarPyA').modal({ dismissible: false });
    $('#importarPyA').modal('open');
  }
  
  fImportarPyA() {
    this.exceljsondata.map((carreras:any) =>{
      this.carreraService.create(carreras).subscribe((resArt:any) =>{}, err =>{console.log(err);})
    })
    $('#importarPyA').modal({ dismissible: false });
    $('#importarPyA').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Profesores y Articulos Migrados',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    })
  }
  

  //-------------------------------- Exportar Profesor --------------------------------
  exportarProfesores() {
    let filename = 'Profesores.xlsx';
    this.profesorService.list().subscribe((data: any) => {
      var ws = XLSX.utils.json_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Profesores");
      XLSX.writeFile(wb, filename);
    })
  }
  
  //-------------------------------- Exportar Articulos --------------------------------
  exportarArticulos(){
    let filename = 'Articulos.xlsx'
    this.articuloService.list().subscribe((data:any) =>{
      var ws = XLSX.utils.json_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Articulos");
      XLSX.writeFile(wb, filename);
    })
  }

  //-------------------------------- Exportar Evento --------------------------------
  exportarEventos(){
    let filename = 'Eventos.xlsx'
    // this.articuloService.list().subscribe((data:any) =>{
    //   var ws = XLSX.utils.json_to_sheet(data);
    //   var wb = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, "People");
    //   XLSX.writeFile(wb, filename);
    // })
  }

  //-------------------------------- Exportar Institutos --------------------------------
  exportarInstitutos(){
    let filename = 'Institutos.xlsx'
    this.institutoService.list().subscribe((data:any) =>{
      var ws = XLSX.utils.json_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Institutos");
      XLSX.writeFile(wb, filename);
    })
  }

  //-------------------------------- Exportar Institutos --------------------------------
  exportarCarreras(){
    let filename = 'Carreras.xlsx'
    this.carreraService.listCarreras().subscribe((data:any) =>{
      var ws = XLSX.utils.json_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Carreras");
      XLSX.writeFile(wb, filename);
    })
  }

  //-------------------------------- Exportar Profesores y Articulos --------------------------------
  exportarPyA(){
    let filename = 'ProfesoresYArticulos.xlsx'
    // this.listCarreras().subscribe((data:any) =>{
    //   var ws = XLSX.utils.json_to_sheet(data);
    //   var wb = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, "People");
    //   XLSX.writeFile(wb, filename);
    // })
  }
  
}
