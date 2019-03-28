import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsejoService {

  constructor(private http: HttpClient) { }

  getConsejos() {
    return this.http.get(`${ApiUrl}/consejo/all`).toPromise()
                    .then(res => res).catch(err => err.error);
  }

  addConsejo(body) {
    return this.http.post(`${ApiUrl}/consejo/add`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  updateConsejo(id, body) {
    return this.http.put(`${ApiUrl}/consejo/update/${id}`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  deleteConsejo(id) {
    return this.http.delete(`${ApiUrl}/consejo/delete/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }
}
