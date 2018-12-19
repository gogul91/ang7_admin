import {Component, OnDestroy} from '@angular/core';
import { navItems } from './../../_nav';

import {
    AppSettings
} from  '../../app.setting';

import {
    HttpClient
} from '@angular/common/http';
import {
    AuthService
} from './../../auth.service';

import {
    ActivatedRoute,
    Router
} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,private auth: AuthService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logout()
  {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
