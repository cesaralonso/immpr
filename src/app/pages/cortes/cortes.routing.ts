import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CortesComponent } from './cortes.component';
import {CortesTableComponent } from './components/cortes-table/cortes-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CortesComponent,
    children: [
      { path: 'cortes-table', component: CortesTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
