import { Component, OnInit } from '@angular/core';
import { Instituto } from 'src/app/models/instituto.model';
import { InstitutoService } from 'src/app/services/instituto.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-listar-institutos',
  templateUrl: './listar-institutos.component.html',
  styleUrls: ['./listar-institutos.component.css']
})
export class ListarInstitutosComponent implements OnInit {

  institutos: any;
  institutoActual: any;
  codigo: any;
  constructor(private intitutoService: InstitutoService) {
    this.institutoActual = new Instituto();
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('select').formSelect();
    });

    this.intitutoService.list().subscribe((resInstitutos: any) => {
      this.institutos = resInstitutos;
    });
  }

  modificarInstitutos(index: any) {
    $('#modificarInstitutos').modal({ dismissible: false });
    $('#modificarInstitutos').modal('open');
    console.log(this.institutos[index]);
    this.institutoActual = this.institutos[index];
  }
  actualizarInstitutos() {
    this.intitutoService.update(this.institutoActual).subscribe((resInstituto: any) => {
    })
    $('#modificarInstitutos').modal({ dismissible: false });
		$('#modificarInstitutos').modal('close');
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Instituto Modificado',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		})
  }

  editarInstituto(op:Instituto) {
    this.institutoActual = op;
    $('#modificarInstitutos').modal({ dismissible: false });
    $('#modificarInstitutos').modal('open');
  
  }
  eliminarInstituto(op: any) {
  
    Swal.fire({
      title: 'Seguro que quieres eliminar este Instituto?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Instituto Eliminado!', '', 'success')
        this.intitutoService.delete(op).subscribe((resProf:any) =>{
        })
        
      } else if (result.isDenied) {
      
      }
    })
  }
  
}
