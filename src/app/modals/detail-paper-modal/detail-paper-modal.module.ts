import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPaperModalPageRoutingModule } from './detail-paper-modal-routing.module';

import { DetailPaperModalPage } from './detail-paper-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPaperModalPageRoutingModule
  ],
  declarations: [DetailPaperModalPage]
})
export class DetailPaperModalPageModule {}
