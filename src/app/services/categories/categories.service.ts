import { Observable } from 'rxjs';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private httpService: HttpService,
  ) { }

  listAll(categoryId: any): Observable<any> {
    return this.httpService.get('categories/' + categoryId + '/indexChange');
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('signup', postData);
  }
}
