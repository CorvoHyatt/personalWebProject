import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
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

  constructor(
    private router: Router,
    private articuloService: ArticuloService,
    private profesorService: ProfesorService,
    private institutosService: InstitutoService,
    private carreraService: CarreraService,
    private imagenesService: ImagenesService) {

    this.fileToUpload = null;
    let hoy = new Date();
    console.log(hoy);
    this.ini = (hoy.getFullYear() - 3) + '-01-01';
    this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
    console.log(this.ini);
    this.idProfesor = Number(localStorage.getItem('idProfesor'));
    this.location = location.href;

  }

  ngOnInit(): void {

    this.articuloService.articulosByProfesor(this.idProfesor, this.ini, this.fin).subscribe((resArticulo: any) => {

      this.datos = resArticulo;
      console.log(this.datos);

    })
  }
  CambioFechaIni() {
    console.log("Probando cambio ini")
    this.ini = $('#fechaIni').val();
    console.log(this.ini)
    this.articuloService.articulosByProfesor(this.idProfesor, this.ini, this.fin).subscribe((resArticulos: any) => {

      this.datos = resArticulos;
      console.log(this.datos);
    })
    this.ngOnInit();

  }
  CambioFechaFin() {
    console.log("Probando cambio fin")
    this.fin = $('#fechaFin').val();
    console.log(this.fin)
    this.articuloService.articulosByProfesor(this.idProfesor, this.ini, this.fin).subscribe((resArticulos: any) => {

      this.datos = resArticulos;
    })
    this.ngOnInit()
  }


  cargarArchivo(files: any, idArticulo: any) {
    console.log("Cambiando nombre del archivo");
    let archivo = files.files
    for(let i = 0;  i < archivo.length; i++){
      this.fileToUpload = archivo.item(i);
      console.log(archivo.item(i));
      let imgPromise = this.getFileBlob(this.fileToUpload);
      imgPromise.then(blob => {
        
        this.imagenesService.guardarArchivo(blob, idArticulo, i, archivo.item(i).type).subscribe((resImagen) => {
    
        }, err => console.error(err))
        console.log(blob);
  
      })
    }
    // this.fileToUpload = archivo.item(0);
    // console.log(archivo)
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


