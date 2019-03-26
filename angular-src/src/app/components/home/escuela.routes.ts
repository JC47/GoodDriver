import { Routes } from '@angular/router';
import { ConsejosComponent } from '../consejos/consejos.component';
import { EscuelasComponent } from '../escuelas/escuelas.component';
import { ReglasComponent } from '../reglas/reglas.component';
import { TestsComponent } from '../tests/tests.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { AuthGuard } from '../../guards/auth.guard';

export const ESCUELA_ROUTES: Routes = [
    { path: 'home', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
    { path: 'consejos', component: ConsejosComponent, canActivate: [AuthGuard] },
    { path: 'tests', component: TestsComponent, canActivate: [AuthGuard] },
    { path: 'reglas', component: ReglasComponent, canActivate: [AuthGuard] },
    { path: 'escuelas', component: EscuelasComponent, canActivate: [AuthGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
