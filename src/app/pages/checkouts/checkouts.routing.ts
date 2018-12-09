import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CheckoutsComponent } from './checkouts.component';
import {CheckoutsTableComponent } from './components/checkouts-table/checkouts-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CheckoutsComponent,
    children: [
      { path: 'checkouts-table', component: CheckoutsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
