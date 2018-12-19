import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AppSettings } from './app.setting';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { TokenInterceptor } from './token.interceptor';

import { CommonModule } from '@angular/common';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },

      {
        path: 'catters',
        loadChildren: './views/catters/catters.module#CattersModule'
      },
      

      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(
      routes,
      { enableTracing: true }
    ),
  NgMultiSelectDropDownModule.forRoot(),
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  NgxSpinnerModule,
  BrowserModule,
  HttpClientModule,
  
  JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: [AppSettings.DOMAIN]
      }
    })    

  ],

  providers: [

     AuthGuard,
     AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },


    HttpClient
  ],

  exports: [ RouterModule ]
})
export class AppRoutingModule {}
