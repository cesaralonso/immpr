import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AccuracyestimacionsComponent } from './accuracyestimacions.component';
import {AccuracyestimacionsTableComponent } from './components/accuracyestimacions-table/accuracyestimacions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AccuracyestimacionsComponent,
    children: [
      { path: 'accuracyestimacions-table', component: AccuracyestimacionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
