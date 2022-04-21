import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import * as XLSX from 'xlsx'
declare var $: any;
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  datos: any;
  ini: any;
  fin: any;
  location: any;
  idProfesor: number
  fileToUpload: any
  file: any;
  uploadEvent: any;
  arrayBuffer: any;
  exceljsondata: any;
  filelist: any;

  constructor(
    private router: Router,
    private articuloService: ArticuloService,
    private profesorService: ProfesorService,
    private institutosService: InstitutoService,
    private carreraService: CarreraService,
    private imagenesService: ImagenesService) {

    this.fileToUpload = null;
    let hoy = new Date();
    this.ini = (hoy.getFullYear() - 3) + '-01-01';
    this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
    this.idProfesor = Number(localStorage.getItem('idProfesor'));
    this.location = location.href;

  }

  ngOnInit(): void {

    this.articuloService.articulosByProfesor(this.idProfesor, this.ini, this.fin).subscribe((resArticulo: any) => {
      this.datos = resArticulo;
    })
  }
  CambioFechaIni() {
    this.ini = $('#fechaIni').val();
    this.articuloService.articulosByProfesor(this.idProfesor, this.ini, this.fin).subscribe((resArticulos: any) => {

      this.datos = resArticulos;
    })
    this.ngOnInit();

  }
  CambioFechaFin() {
    this.fin = $('#fechaFin').val();
    this.articuloService.articulosByProfesor(this.idProfesor, this.ini, this.fin).subscribe((resArticulos: any) => {

      this.datos = resArticulos;
    })
    this.ngOnInit()
  }

  // #NOTE:Comentado para prueba de captura de excel, remover comentarios una ves terminado
  // cargarArchivo(files: any, idArticulo: any) {
  //   console.log("Cambiando nombre del archivo");
  //   let archivo = files.files
  //   for(let i = 0;  i < archivo.length; i++){
  //     this.fileToUpload = archivo.item(i);
  //     console.log(archivo.item(i));
  //     let imgPromise = this.getFileBlob(this.fileToUpload);
  //     imgPromise.then(blob => {

  //       this.imagenesService.guardarArchivo(blob, idArticulo, i, archivo.item(i).type).subscribe((resImagen) => {

  //       }, err => console.error(err))
  //       console.log(blob);

  //     })
  //   }
  //   this.fileToUpload = archivo.item(0);
  //   console.log(archivo)
  // }

  cargarArchivo(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log("Entre:", this.file);
      this.uploadEvent = event;
    }
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = [];
      console.log(this.exceljsondata);
    }
  }

  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) {
      reader.onload = (function (thefile) {
        return function (e: any) {
          resolve(e.target.result);
        };
      })(file);
      reader.readAsDataURL(file);
    });

  }

}


