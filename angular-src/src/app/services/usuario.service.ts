import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios(id) {
    return this.http.get(`${ApiUrl}/usuario/all/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  updateUsuario(id, body) {
    return this.http.put(`${ApiUrl}/usuario/update/${id}`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  deleteUsuario(id) {
    return this.http.delete(`${ApiUrl}/usuario/delete/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }
}
