import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  loginRequest(data) {
    return this.http.post(`${ApiUrl}/escuela/login`, data).toPromise()
                    .then( res => res)
                    .catch(err => err.error);
  }

  loggedIn() {
    return localStorage.getItem('GDToken') !== null;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
