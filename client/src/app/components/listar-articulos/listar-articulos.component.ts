import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Articulo } from '../../models/articulo.model';
import { InstitutoService } from 'src/app/services/instituto.service';
declare var $: any;
@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css']
})
export class ListarArticulosComponent implements OnInit {

  	articulos: any;
	institutos: any;
	institutoActual: any;
	pages: number = 1
	
	constructor(private articuloService: ArticuloService, private intitutoService: InstitutoService) {
	}

	ngOnInit(): void {
		this.intitutoService.list().subscribe((resInstitutos: any) => {
			this.institutos = resInstitutos;
			this.institutoActual = this.institutos[1].idInstituto;
			this.articuloService.articulosByInstituto( this.institutoActual).subscribe((resArticulos: any) => {
				this.articulos = resArticulos;
				console.log(resArticulos)
			},
				err => console.error(err)
			);
		},
			err => console.error(err)
		);
	}
	cambioInstituto(op: any) {
		this.institutoActual = op.value;
		console.log(this.institutoActual)
		this.articuloService.articulosByInstituto(this.institutoActual).subscribe((resArticulos: any) => {
			this.articulos = resArticulos;
			console.log(resArticulos)
		},
			err => console.error(err)
		);
	}
}
