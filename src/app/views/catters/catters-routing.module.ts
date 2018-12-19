import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { CattersComponents } from './catters.component';

const routes: Routes = [
  {
    path: '',
    component: CattersComponents,
    data: {
      title: 'Catters'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CattersRoutingModule {}
