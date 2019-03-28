import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EscuelaService {

  constructor(private http: HttpClient) { }

  getEscuelas() {
    return this.http.get(`${ApiUrl}/escuela/all`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  addEscuela(body) {
    return this.http.post(`${ApiUrl}/escuela/add`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  updateEscuela(id, body) {
    return this.http.put(`${ApiUrl}/escuela/update/${id}`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  deleteEscuela(id) {
    return this.http.delete(`${ApiUrl}/escuela/delete/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }
}
