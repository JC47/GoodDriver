import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTests() {
    return this.http.get(`${ApiUrl}/test/all`).toPromise()
      .then(res => res).catch(err => err.error);
  }

  addTest(body) {
    return this.http.post(`${ApiUrl}/test/add`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  addQuestionTest(id, body) {
    return this.http.put(`${ApiUrl}/test/addpregunta/${id}`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  deleteQuestionTest(id, body) {
    return this.http.put(`${ApiUrl}/test/removepregunta/${id}`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  updateTest(id, body) {
    return this.http.put(`${ApiUrl}/test/update/${id}`, body).toPromise()
      .then(res => res).catch(err => err.error);
  }

  deleteTest(id) {
    return this.http.delete(`${ApiUrl}/test/delete/${id}`).toPromise()
      .then(res => res).catch(err => err.error);
  }
}
