import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  headers: Headers;
  api_url: string = 'http://localhost:8080/api';

  constructor(private http: Http) {
    console.log('ApiService constructor.');

    this.resetHeaders();
  }

  resetHeaders() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  }

  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Response | Observable<any> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, { headers: this.headers })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  post(path: string, body): Observable<any> {
    return this.http.post(`${this.api_url}${path}`, JSON.stringify(body), { headers: this.headers })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.api_url}${path}`, { headers: this.headers })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
    console.log('Set api headers: ', this.headers.toJSON());
  }

}
