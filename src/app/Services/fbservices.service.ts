import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../Services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class FBServicesService {

  private prefix = "https://graph.facebook.com/";
  private url_accounts = "/accounts?";
  private url_feed = "/feed";

  public header;

  constructor(private httpClient: HttpClient, private auth: AuthenticateService) {
    this.header = this.auth.Header();
    console.log(this.auth.GetToken());
   }

  public GetPages(id: string): Observable<any> {
    return this.httpClient.get<any>(this.prefix + id + this.url_accounts, this.header);
  }

  public PublishContentToPage(pageId: string, postData: any): Observable<any> {
    return this.httpClient.post(this.prefix + pageId + this.url_feed, this.header);
  }
}
