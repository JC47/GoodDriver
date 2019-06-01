import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIurl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GooddriverService {

  constructor(private http: HttpClient) { }

  getReglas() {
    return this.http.get(`${APIurl}/usuario/getreglas`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  getConsejos() {
    return this.http.get(`${APIurl}/usuario/getconsejos`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  getTests() {
    return this.http.get(`${APIurl}/usuario/gettests`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  getRegla(id) {
    return this.http.get(`${APIurl}/usuario/getregla/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  getConsejo(id) {
    return this.http.get(`${APIurl}/usuario/getconsejo/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  getTest(id) {
    return this.http.get(`${APIurl}/usuario/gettest/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }
}
