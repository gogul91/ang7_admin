import {
    Component,
    OnInit,
    ViewChild,
    NgZone,
    AfterViewInit,
    HostListener,
    ElementRef
} from '@angular/core';
import {
    HttpClient
} from '@angular/common/http';
import {
    ActivatedRoute,
    Router
} from "@angular/router";

import {
    AppSettings
} from  '../../app.setting';

import {
    AuthService
} from './../../auth.service';


import * as _ from 'lodash';
import * as moment from "moment";

import {
    Chart
} from 'chart.js';
declare var Plotly: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent  implements OnInit { 

 data: any;
    datas: any;
    result: any;
    error: string;
    return: string = '';
    menu: any;

constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,private auth: AuthService) {

     this.data = {
            username: '',
            password: ''
        }
        this.error = '';

    }

     ngOnInit() {


     }

     submit()
     {     	
          this.error = ''
        if (!this.data.username) {
            this.error = "Enter The Username"
            return false;
        }
        if (!this.data.password) {
            this.error = "Enter The Password"
            return false;
        }
        
        this.http.post(AppSettings.API_ENDPOINT + 'web_login/', this.data).subscribe(data => {
            this.result = data;  
                     
            if (this.result) {                
                if (this.result.status == "error") {
                    this.error = this.result.data;
                    return;
                }
                if (this.result.data) {             
                        
                    if (this.result.data[0].token) {                       
                        let token = this.result.data[0].token.toString();
                        let tempFlag = this.result.data.IS_ADMIN || false;
                        let Flag = this.result.data.SUPER_ADMIN || false;


                        this.auth.setToken(token);

                        
                        // localStorage.setItem("TOKEN_KEY", token);                     
                        this.router.navigate(["/dashboard"]);
                    }
                }
            }
        }, error => {
            this.error = 'Connection Error'
        });


     }
}


