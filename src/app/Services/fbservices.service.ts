import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../Services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class FBServicesService {

  private prefix = 'https://graph.facebook.com/';
  private url_accounts = '/accounts?';
  private url_feed = '/feed';
  private url_impressions = '/insights/page_impressions?access_token=';
  private days_total_impressions = '&period=days_28';
  private url_total_likes = '?fields=fan_count';

  public header;

  constructor(private httpClient: HttpClient, private auth: AuthenticateService) {
    this.header = this.auth.Header();
    console.log(this.auth.GetToken());
   }

  public GetPages(id: string): Observable<any> {
    return this.httpClient.get<any>(this.prefix + id + this.url_accounts, this.header);
  }

  public PublishContentToPage(pageId: string, postData: any): Observable<any> {
    return this.httpClient.post(this.prefix + pageId + this.url_feed, postData, this.header);
  }

  public GetPageImpressions(pageId: string, pageAccessToken: string): Observable<any> {
    return this.httpClient.get<any>(this.prefix + pageId + this.url_impressions + pageAccessToken + this.days_total_impressions  , this.header);
  }

  public GetPageLikes(pageId: string): Observable<any> {
    return this.httpClient.get<any>(this.prefix + pageId + this.url_total_likes, this.header);
  }
}
