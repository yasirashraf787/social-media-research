import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private Token: string;
  constructor() { }

  public GetToken(): string {
    if (!this.Token) {
      this.Token = localStorage.getItem('Token');
    }
    return this.Token;
  }

  public SaveToken(token: string): void {
    localStorage.setItem('Token', token);
    this.Token = token;
  }

  public Header(): any {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.GetToken())
    }

    return header;
  }
}
