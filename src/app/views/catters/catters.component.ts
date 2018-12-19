import {
    Component,
    OnInit,
    ViewChild,
    TemplateRef
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import {
    HttpClient
} from '@angular/common/http';

import {
    ActivatedRoute,
    Router
} from "@angular/router";
import {
    DatatableComponent
} from '@swimlane/ngx-datatable';
import {
    AppSettings
} from '../../app.setting';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'catters.component.html'
})
	


export class CattersComponents implements OnInit { 

 constructor( private router: Router, private _route: ActivatedRoute,private http: HttpClient,private spinner: NgxSpinnerService) {
    }

 rowsFilter:any;
 AllData:any;
 showform:boolean= false;


     ngOnInit() {
     	this.loaddata();

     }

loaddata()
{

	 this.spinner.show();        
	
	this.http.get(AppSettings.API_ENDPOINT + 'getall_catterlist/').subscribe((data: any) => {  
 	this.spinner.hide();        

 	
        this.rowsFilter = data.data;
        console.log(this.rowsFilter)  
        this.AllData    = [];
	})

}

   
}



