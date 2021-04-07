import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {

  constructor(private httpClient: HttpClient) { }

  public GetAuth(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/linkedin/auth');
  }

  public GetUser(authorized: any, token: any): Observable<any> {
    // var header = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', 'Bearer ' + accessToken)
    // }
    return this.httpClient.get<any>('http://localhost:3000/linkedin/user', {params: {isAuthorized: authorized, token: token}}); //https://api.linkedin.com/v2/me
  }
}
