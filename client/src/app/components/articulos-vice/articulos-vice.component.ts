import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
declare var $: any;

@Component({
	selector: 'app-articulos-vice',
	templateUrl: './articulos-vice.component.html',
	styleUrls: ['./articulos-vice.component.css']
})
export class ArticulosViceComponent implements OnInit {
	articulos: any;
	autores: any;
	ini: any;
	fin: any;
	profesores: any;
	institutos: any;
	institutoActual: any;
	carreras: any;
	numCarByInst: any;
	carreraActual: any;
	profesor: any;
	tipoProfesores: any;
	profesorActual: Profesor;
	constructor(
		private articuloService: ArticuloService,
		private institutosService: InstitutoService,
		private profesorService: ProfesorService,
		private carreraService: CarreraService
	) {
		let hoy = new Date();
		this.profesorActual = new Profesor();
		console.log(hoy);
		this.ini = (hoy.getFullYear() - 3) + '-01-01';
		this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
		console.log(this.ini);
	}

	ngOnInit(): void {
		$(document).ready(function () {

			$('select').formSelect();
		});

		this.institutosService.list().subscribe((resInstitutos: any) => {
			//Catch institutos 
			console.log(resInstitutos);// <==
			this.institutos = resInstitutos;
			this.institutoActual = this.institutos[1].idInstituto;
			this.carreraService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
				console.log(resCarreras);// <==
				//Catch carreras del instituto enviado
				this.carreraActual = resCarreras[0].idCarrera;
				this.numCarByInst = resCarreras.length;
				this.carreras = resCarreras;
				this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
					console.log(resProfesores);// <==
					//Catch Profesores de la carrera
					this.profesores = resProfesores;
					this.profesorService.tipoProfesor().subscribe((resTipoProfesores: any) => {
						console.log(resTipoProfesores); // <==
						//Catch tipo de profesor 
						this.tipoProfesores = resTipoProfesores;
						this.profesorService.list().subscribe((resProfesores: any) => {
							console.log(resProfesores) // <==

							this.profesores = resProfesores;
						},
							err => console.error(err));
					},
						err => console.error(err)
					);
				},
					err => console.error(err)
				);
			},
				err => console.error(err)
			);
		},
			err => console.error(err)
		);

	}

	modificarProfesor(index: any) {
		$('#modificarProfesor').modal({ dismissible: false });
		$('#modificarProfesor').modal('open');
		console.log("modificar profesor")
		this.profesorActual = this.profesores[index];
		console.log(this.profesores[index])
	}
	darAltaProfesor() {

	}
	cambioInstituto(op: any) {
		console.log('Entro ', op.value)
		this.institutoActual = op.value;
		this.carreraService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
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

	CambioFechaIni() {
		console.log("Probando cambio ini")
		this.ini = $('#fechaIni').val();
		console.log(this.ini)
		this.articuloService.listByPeriodo(this.ini, this.fin).subscribe((resArticulos: any) => {
			console.log("Saliendo a servicio");

			this.articulos = resArticulos;
			this.articulos.forEach((element: any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => {
					this.autores.push(resAutores);
				},
					err => console.error(err));
			});

		},
			err => console.error(err)

		);
	}
	CambioFechaFin() {
		console.log("Probando cambio fin")
		this.fin = $('#fechaFin').val();
		console.log(this.fin)
		this.articuloService.listByPeriodo(this.ini, this.fin).subscribe((resArticulos: any) => {
			console.log("Saliendo a servicio");

			this.articulos = resArticulos;
			this.articulos.forEach((element: any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => {
					this.autores.push(resAutores);
				},
					err => console.error(err));
			});

		},
			err => console.error(err)

		);
	}
}