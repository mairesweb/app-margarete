import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(serviceName: string, data: any) {
    const headers = new HttpHeaders();
    const options = { headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, data, options);
  }

  get(uri: string) {
    const headers = new HttpHeaders();
    const options = { headers, withCredintials: false };
    const url = environment.apiUrl + uri;

    return this.http.get(url, options);
  }
}
