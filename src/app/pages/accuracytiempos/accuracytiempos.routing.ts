import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AccuracytiemposComponent } from './accuracytiempos.component';
import {AccuracytiemposTableComponent } from './components/accuracytiempos-table/accuracytiempos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AccuracytiemposComponent,
    children: [
      { path: 'accuracytiempos-table', component: AccuracytiemposTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
