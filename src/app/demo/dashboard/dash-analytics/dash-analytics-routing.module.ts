import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashAnalyticsComponent} from './dash-analytics.component';
import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '',
    component: DashAnalyticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashAnalyticsRoutingModule { 
 
}
