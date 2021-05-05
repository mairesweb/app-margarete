import { HomeGuard } from './../guards/home.guard';
import { HomePage } from './home.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: 'home',
    component: HomePage,
    canActivate: [HomeGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../pages/resume/resume.module').then( m => m.ResumePageModule)
      },
      {
        path: 'resume',
        loadChildren: () => import('../pages/resume/resume.module').then( m => m.ResumePageModule)
      },
      {
        path: 'extract',
        loadChildren: () => import('../pages/extract/extract.module').then(m => m.ExtractPageModule)
      },
      {
        path: 'planning',
        loadChildren: () => import('../pages/planning/planning.module').then(m => m.PlanningPageModule)
      },
      {
        path: 'investment',
        loadChildren: () => import('../pages/investment/investment.module').then(m => m.InvestmentPageModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('../pages/transaction/transaction.module').then( m => m.TransactionPageModule)
      },
      {
        path: 'detail-paper-modal',
        loadChildren: () => import('../modals/detail-paper-modal/detail-paper-modal.module').then( m => m.DetailPaperModalPageModule)
      },
      {
        path: 'goal',
        loadChildren: () => import('../pages/goal/goal.module').then( m => m.GoalPageModule)
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRouter {}