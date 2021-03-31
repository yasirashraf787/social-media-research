import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  private oauth_consumer_key = 'XJ3v59z4tm5HZEUM6AmG6w7Y8';
  private oauth_consumer_secret = 'y3aeVcimtbzLO4kqoNpD7GAZewrdQ6RX6OGk16oCMlIyrTZL3z';

  private prefix = 'https://api.twitter.com/';
  private url_request_token = 'oauth/request_token?';

  constructor(private httpClient: HttpClient) { }

  public RequestToken(auth: any): Observable<any>{
    // 'oauth_consumer_key=' + this.oauth_consumer_key + '&oauth_consumer_secret=' + this.oauth_consumer_secret
    var header = {
      headers: new HttpHeaders({
        // 'oauth_consumer_key': this.oauth_consumer_key,
        // 'oauth_consumer_secret': this.oauth_consumer_secret,
        'Accept': '*/*',
      })
    }

    return this.httpClient.post<any>(this.prefix + this.url_request_token, auth, header);
  }
}
