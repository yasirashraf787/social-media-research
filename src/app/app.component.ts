import { Component, DebugElement, OnInit } from '@angular/core';

//#region 
// declare function FBLogin(): any;
declare const FBLogin: Function;
declare const GetFBLoginStatus: Function;
//#endregion

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fb-post';

  ngOnInit(): void {
  }
}
