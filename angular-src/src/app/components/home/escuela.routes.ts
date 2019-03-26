import { Routes } from '@angular/router';

export const ESCUELA_ROUTES: Routes = [
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];