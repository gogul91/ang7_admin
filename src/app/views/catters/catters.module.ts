import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CattersComponents } from './catters.component';
import { CattersRoutingModule } from './catters-routing.module';
import {CommonModule} from  '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    FormsModule,
    CattersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),NgxDatatableModule,CommonModule
  ],
  declarations: [ CattersComponents ]
})
export class CattersModule { }
