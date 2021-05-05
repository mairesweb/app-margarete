import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPaperModalPage } from './detail-paper-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPaperModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPaperModalPageRoutingModule {}
