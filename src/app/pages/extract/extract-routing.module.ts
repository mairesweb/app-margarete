import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtractPage } from './extract.page';

const routes: Routes = [
  {
    path: '',
    component: ExtractPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtractPageRoutingModule {}
