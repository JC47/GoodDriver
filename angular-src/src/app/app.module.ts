import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

// Servicios
import { AuthService } from './services/auth.service';

// Interceptor
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';

// Guards
import { AuthGuard } from './guards/auth.guard';


// Rutas
import { APP_ROUTING } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EscuelasComponent } from './components/escuelas/escuelas.component';
import { ReglasComponent } from './components/reglas/reglas.component';
import { ConsejosComponent } from './components/consejos/consejos.component';
import { TestsComponent } from './components/tests/tests.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    UsuariosComponent,
    EscuelasComponent,
    ReglasComponent,
    ConsejosComponent,
    TestsComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
