import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {

  private url_auth = 'http://localhost:3000/linkedin/auth';
  private url_user = 'http://localhost:3000/linkedin/user';
  private url_publish = 'http://localhost:3000/linkedin/publish';

  constructor(private httpClient: HttpClient) { }

  public GetAuth(): Observable<any> {
    return this.httpClient.get<any>(this.url_auth);
  }

  public GetUser(authorized: any, token: any): Observable<any> {
    return this.httpClient.get<any>(this.url_user, {params: {isAuthorized: authorized, token: token}}); //https://api.linkedin.com/v2/me
  }

  public PublishContent(postData: any, token): Observable<any> {
    return this.httpClient.post<any>(this.url_publish, postData, {params: {access_token: token}});
  }
}
