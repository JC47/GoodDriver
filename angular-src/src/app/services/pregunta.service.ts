import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http: HttpClient) { }

  getPreguntas() {
    return this.http.get(`${ApiUrl}/pregunta/all`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  addPregunta(body) {
    return this.http.post(`${ApiUrl}/pregunta/add`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  updatePregunta(id, body) {
    return this.http.put(`${ApiUrl}/pregunta/update/${id}`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  deletePregunta(id) {
    return this.http.delete(`${ApiUrl}/pregunta/delete/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }
}
