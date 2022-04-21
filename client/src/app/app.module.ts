import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfesoresComponent,
    NavigationComponent,
    GeneralesComponent,
    HomeComponent,
    ArticulosComponent,
    ArticulosViceComponent,
    RecuperarComponent,
    ProfesoresViceComponent,
    ListarProfesoresComponent,
    ListarInstitutosComponent,
    ListarCarrerasComponent,
    ListarArticulosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
