import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ESCUELA_ROUTES } from './components/home/escuela.routes';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'escuela', component: HomeComponent, canActivate: [AuthGuard], children: ESCUELA_ROUTES },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
