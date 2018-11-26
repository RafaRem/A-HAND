import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SolicitudesComponent } from './empresa/solicitudes/solicitudes.component';
import { InicioComponent } from './inicio/inicio.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EmpresaHeaderComponent } from './header/EmpresaHeader/empresaheader.component';
import { LoginComponent } from './login/login/login.component';
import { EmpleadoHeaderComponent } from './header/EmpleadoHeader/empleadoheader.component';
import { RegEmpleadoComponent } from './empleado/reg-empleado/reg-empleado.component';
import { VacantesComponent } from './empresa/vacantes/vacantes.component';
import { AltavacanteComponent } from './empresa/altavacante/altavacante.component';
import { SugerenciasComponent } from './empresa/sugerencias/sugerencias.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrarEmpresaComponent } from './empresa/registrar-empresa/registrar-empresa.component';
import { PerfilEmpleadoComponent } from './empleado/perfil-empleado/perfil-empleado.component';
import { AddcurriculumComponent } from './empresa/addcurriculum/addcurriculum.component';
import { MisSocicitudesComponent } from './empleado/mis-socicitudes/mis-socicitudes.component';
import { InicioEmpleadoComponent } from './empleado/inicio-empleado/inicio-empleado.component';
import { VerVacanteComponent } from './empleado/ver-vacante/ver-vacante.component';
import { CurriculumComponent } from './empleado/curriculum/curriculum.component';
import { CrudusuariosService } from './servicios/crudusuarios.service';
import { AutenticacionService } from './servicios/autenticacion.service';
import { ProofComponent } from './proof/proof.component';
import { CheckUserService } from './servicios/check-user.service';
import { AuthempleadoService } from './servicios/authempleado.service';
import { InicioEmpresaComponent } from './empresa/inicio-empresa/inicio-empresa.component';


 

const routes: Routes= [

  {path: '', component: InicioComponent},
  {path: 'InicioEmpresa', component: InicioEmpresaComponent},
  {path: 'sabe', component: ProofComponent, canActivate:[CheckUserService]},
  {path: 'curriculum', component: CurriculumComponent},
  {path: "detalleVacante", component: VerVacanteComponent, canActivate: [AutenticacionService]},
  {path: 'InicioEmpleado', component: InicioEmpleadoComponent, canActivate: [AuthempleadoService]},
  {path: 'misSolicitudes', component: MisSocicitudesComponent,  canActivate: [AuthempleadoService]},
  {path: 'addcurri', component: AddcurriculumComponent,  canActivate: [AutenticacionService]},
  {path: 'perfilempleado', component: PerfilEmpleadoComponent,  canActivate: [AuthempleadoService]},
  {path: 'registrarEmpresa/login', component: LoginComponent},
  {path: 'registrar/login', component: LoginComponent},
  {path: 'registrarEmpresa', component: RegistrarEmpresaComponent},
  {path: 'vacantes/sugerencias', component: SugerenciasComponent},
  {path: 'misvacantes', component: VacantesComponent, canActivate: [AutenticacionService]},
  {path: 'altavacante', component: AltavacanteComponent, canActivate: [AutenticacionService]},
  {path: 'vacantes', component: SolicitudesComponent, canActivate: [AutenticacionService]},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegEmpleadoComponent},
  {path: '**', component: InicioComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    SolicitudesComponent,
    InicioComponent,
    HeaderComponent,
    LoginComponent,
    RegEmpleadoComponent,
    VacantesComponent,
    AltavacanteComponent,
    SugerenciasComponent,
    EmpleadoHeaderComponent,
    FooterComponent,
    RegistrarEmpresaComponent,
    PerfilEmpleadoComponent,
    AddcurriculumComponent,
    EmpresaHeaderComponent,
    MisSocicitudesComponent,
    InicioEmpleadoComponent,
    VerVacanteComponent,
    CurriculumComponent,
    ProofComponent,
    InicioEmpresaComponent,
  

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
