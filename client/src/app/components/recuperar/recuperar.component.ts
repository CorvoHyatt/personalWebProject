import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { CorreoService } from 'src/app/services/correo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-recuperar',
    templateUrl: './recuperar.component.html',
    styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

    password: string
    confirm_password: string
    token: string
    idProfesor:string

    constructor(private correoService: CorreoService, private route: ActivatedRoute, private router: Router, private profesorService: ProfesorService) {
        this.password = "123/123"
        this.confirm_password = "123/123"
        this.token = ""
        this.idProfesor = ""
        
    }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            this.token = String(params.get('token'));
        })
        this.correoService.decodificarMail(this.token).subscribe((resDecodificar: any) => {
            if(resDecodificar == 0){
                
                this.router.navigateByUrl('/login');
            }
            this.idProfesor = resDecodificar.idProfesor;
        })

    }
    submit() {
        console.log("Submit")   
        if (!this.password.localeCompare(this.confirm_password)) {

            this.profesorService.actualizarContrasena({"idProfesor": this.idProfesor, "password": this.password}).subscribe((resProfesor: any) =>{
                console.log(resProfesor)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cambio Realizado',
                    text: 'Intente logearse con su nueva contraseña',
                    confirmButtonAriaLabel: 'Thumbs up, great!'
                })
                this.router.navigateByUrl("/login");
            })

        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Contraseñas no coincidentes',
                text: 'Intentelo nuevamente'
            })
            this.password = ""
            this.confirm_password = ""
        }
    }

}
