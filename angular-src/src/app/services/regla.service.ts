import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReglaService {

  constructor(private http: HttpClient) { }

  getReglas() {
    return this.http.get(`${ApiUrl}/regla/all`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  addRegla(body) {
    return this.http.post(`${ApiUrl}/regla/add`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  updateRegla(id, body) {
    return this.http.put(`${ApiUrl}/regla/update/${id}`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  deleteRegla(id) {
    return this.http.delete(`${ApiUrl}/regla/delete/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }
}
