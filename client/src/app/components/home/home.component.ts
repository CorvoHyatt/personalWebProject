import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TipoProfesorService } from 'src/app/services/tipo-profesor.service';
import Swal from 'sweetalert2';
import { Articulo } from '../../models/articulo.model';
import { Profesor } from '../../models/profesor.model';

declare var $: any;
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	articulo: Articulo;
	tipCLR: any[] = ['Revista', 'Congreso', 'Libro'];
	institutos: any;
	institutoActual: any;
	carreras: any;
	numCarByInst: any;
	profesores: any;
	carreraActual: any;
	idProfesor: number;
	profesor: Profesor;
	location: any;

	tipoProfesor: any;

	constructor(
		private router: Router,
		private carreraService: CarreraService,
		private institutoService: InstitutoService,
		private tipoProfesorService: TipoProfesorService,
		private articuloService: ArticuloService,
		private profesorService: ProfesorService
	) {
		this.articulo = new Articulo();
		this.profesor = new Profesor();
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.location = location.href;

	}

	ngOnInit(): void {
		$(document).ready(function () {
			$('.fixed-action-btn').floatingActionButton({
				direction: 'left',
				hoverEnabled: false
			});
			$('select').formSelect();
		});

	}

	agregarArticulo() {

		console.log("agregarArticulo");
		$('#agregarArticulo').modal({ dismissible: false });
		$('#agregarArticulo').modal('open');
	}

	darAltaArticulo() {
		this.articuloService.create(this.articulo, this.idProfesor).subscribe((resProfesor: any) => {

		},
			err => console.error(err))
		$('#agregarArticulo').modal({ dismissible: false });
		$('#agregarArticulo').modal('close');
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Publicación Agregada',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		}).then(() =>{
			if (this.location == 'http://localhost:4200/home/articulos/' + this.idProfesor || this.location == 'http://localhost:4200/home/listarArticulos/'+this.idProfesor) {
				document.location.reload()
			}

		})
	}

	altaProfesorB() {
		$('#altaProfesorB').modal({ dismissible: false });
		$('#altaProfesorB').modal('open');
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
		})
		if (this.location == 'http://localhost:4200/home/listarProfesores/' + this.idProfesor) {
			document.location.reload()
		}
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


}
