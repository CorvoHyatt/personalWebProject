import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-listar-carreras',
  templateUrl: './listar-carreras.component.html',
  styleUrls: ['./listar-carreras.component.css']
})
export class ListarCarrerasComponent implements OnInit {

  carreras: any;
  carreraActual: any;
  codigo: any;
  institutoActual: any;
  institutos: any;
  numCarByInst: any;

  constructor(private carreraService: CarreraService, private institutoService: InstitutoService, private profesorService: ProfesorService) {
    this.carreraActual = new Carrera();
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('select').formSelect();
    });

    this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
      this.institutos = resInstitutos;
      this.institutoActual = this.institutos[1].idInstituto;
      this.carreraService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
        this.numCarByInst = resCarreras.length;
        this.carreras = resCarreras;
      },
        err => console.error(err)
      );
    },
      err => console.error(err)
    );
  }

  listarCambioInstituto(op: any) {
    this.institutoActual = op.value;
    this.carreraService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
      console.log(resCarreras);
      this.numCarByInst = resCarreras.length;
      if (this.numCarByInst == 0)
        this.carreraActual = 0
      else {
        this.carreras = resCarreras; 
      }
    },
      err => console.error(err)
    );
  }

  modificarCambioInstituto(op: any) {
    this.institutoActual = op.value;
    this.carreraService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
      console.log(resCarreras);
      
      if (resCarreras.length == 0){
        this.carreraActual = 0;
        this.carreras = []
      }
      else {
        this.carreras = resCarreras;
      }
    },
      err => console.error(err)
    );
  }

  modificarCarrera(){
    this.carreraService.update(this.carreraActual.idCarrera,this.carreraActual).subscribe((resProf:any) =>{
    })
    
		$('#modificarCarrera').modal({ dismissible: false });
		$('#modificarCarrera').modal('close');
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Carrera Modificada',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		})
  }

  editarCarrera(op:Carrera) {
    this.carreraActual = op;
    $('#modificarCarrera').modal({ dismissible: false });
    $('#modificarCarrera').modal('open');
    

  }

  eliminarCarrera(op:number){
    
    Swal.fire({
      title: 'Seguro que quieres eliminar esta carrera?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Carrrera Eliminado!', '', 'success')
        this.carreraService.borrarCarrera(op).subscribe((resProf:any) =>{
        })
        
      } else if (result.isDenied) {
      
      }
    })
  }

}
