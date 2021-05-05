import { ChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumePageRoutingModule } from './resume-routing.module';

import { ResumePage } from './resume.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    ResumePageRoutingModule
  ],
  declarations: [ResumePage]
})
export class ResumePageModule {}
