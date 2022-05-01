import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TipoProfesorService } from 'src/app/services/tipo-profesor.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-listar-profesores',
  templateUrl: './listar-profesores.component.html',
  styleUrls: ['./listar-profesores.component.css']
})
export class ListarProfesoresComponent implements OnInit {
  location: any;
  carreras: any
  institutos: any
  profesores: any
  carreraActual: any
  profesorEdit: Profesor
  tipoProfesor: any
  idProfesor: number
  constructor(
    private carreraService: CarreraService,
    private institutosService: InstitutoService,
    private profesoresService: ProfesorService,
    private tipoProfesorService: TipoProfesorService,
    private profesorService: ProfesorService
  ) {
    this.profesorEdit = new Profesor();
    this.location = location.href;
    this.idProfesor = Number(localStorage.getItem('idProfesor'));

  }

  ngOnInit(): void {
    this.institutosService.list().subscribe((resInstitutos) => {
      this.institutos = resInstitutos;
    }, err => console.error(err));
    this.carreraService.listCarreraByInstituto(1).subscribe((resCarreras: any) => {

      this.carreras = resCarreras;
      this.profesoresService.listProfesoresByCarrera(this.carreras[0].idCarrera).subscribe((resProfesores: any) => {
        this.profesores = resProfesores;
        console.log(this.profesores);
      }, err => console.error(err))
    },
      err => console.error(err)
    );

    this.tipoProfesorService.listTipoProfesor().subscribe((resTipoProfesor: any) => {
      this.tipoProfesor = resTipoProfesor;
    })

  }

  cambioTipoProfesor(op: any) {
    this.profesorEdit.idTipoProfesor = Number(op.value);

  }

  cambioInstitutoL(op: any) {

    this.carreraService.listCarreraByInstituto(Number(op.value)).subscribe((resCarreras: any) => {

      this.carreras = resCarreras;
      console.log(this.carreras);
      if (this.carreras.length > 0) {
        this.profesoresService.listProfesoresByCarrera(this.carreras[0].idCarrera).subscribe((resProfesores: any) => {
          this.profesores = resProfesores;
        }, err => console.error(err))
      } else {
        this.carreras = [];
        this.profesores = [];
        this.profesoresService.listProfesoresByInstituto(Number(op.value)).subscribe((resProfesores: any) => {
          this.profesores = resProfesores;
        }, err => console.error(err))
      }
    },
      err => console.error(err)
    );
  }

  cambioCarreraL(op: any) {

    this.carreraActual = Number(op.value);
    this.profesoresService.listProfesoresByCarrera(this.carreraActual).subscribe((resCarreras: any) => {

      this.profesores = resCarreras;
    },
      err => console.error(err)
    );
  }

  editarProfesor(op: Profesor) {
    this.profesorEdit = op;
    $('#editarProf').modal({ dismissible: false });
    $('#editarProf').modal('open');


  }


  ModificarProfesor() {
    this.profesorService.actualizarProfesor(this.profesorEdit).subscribe((resProf: any) => {
    })

    $('#editarProf').modal({ dismissible: false });
    $('#editarProf').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Profesor Modificado',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    })
  }

  eliminarProfesor(op: number) {

    Swal.fire({
      title: 'Seguro que quieres eliminar profesor?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Profesor Eliminado!', '', 'success')
        this.profesorService.borrarProfesor(op).subscribe((resProf: any) => {
        })
        if (this.location == 'http://localhost:4200/home/listarProfesores/' + this.idProfesor || this.location == 'http://localhost:4200/home/listarArticulos/' + this.idProfesor) {
          document.location.reload()
        }

      } else if (result.isDenied) {

      }
    })
  }
}