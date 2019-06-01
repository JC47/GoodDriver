import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIurl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login() {
    return this.http.post(`${APIurl}/usuario/login`, { email: 'usuario1@gmail.com', password: '123456' }).toPromise()
      .then(res => res).catch(err => err.error);
  }
}
