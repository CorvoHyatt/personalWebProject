import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
import { ListarProfesoresComponent } from './components/listar-profesores/listar-profesores.component';
import { ListarInstitutosComponent } from './components/listar-institutos/listar-institutos.component';
import { ListarCarrerasComponent } from './components/listar-carreras/listar-carreras.component';
import { ListarArticulosComponent } from './components/listar-articulos/listar-articulos.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profesores',
    component: ProfesoresComponent
  },
  {
    path: 'recuperar/:token',
    component: RecuperarComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'generales/:idProfesor',
        component: GeneralesComponent,
      },
      {
        path: 'articulos/:idProfesor',
        component: ArticulosComponent
      },
      {
        path: 'articulosVice/:idProfesor',
        component: ArticulosViceComponent
      },
      {
        path: 'profesoresVice/:idProfesor',
        component: ProfesoresViceComponent
      },
      {
        path: 'listarProfesores/:idProfesor',
        component: ListarProfesoresComponent
      },
      {
        path: 'listarInstitutos/:idProfesor',
        component: ListarInstitutosComponent
      },
      {
        path: 'listarCarreras/:idProfesor',
        component: ListarCarrerasComponent
      },
      {
        path: 'listarArticulos/:idProfesor',
        component: ListarArticulosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
