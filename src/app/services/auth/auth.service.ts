import { AuthConstants } from '../../config/auth-constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  login(postData: any): Observable<any> {
    return this.httpService.post('login', postData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('signup', postData);
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(
      res => {this.router.navigate(['/login']);
    });
  }
}
