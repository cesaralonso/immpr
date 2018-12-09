import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {Si_reportesComponent } from './si_reportes.component';
import {Si_reportesTableComponent } from './components/si_reportes-table/si_reportes-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Si_reportesComponent,
    children: [
      { path: 'si_reportes-table', component: Si_reportesTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
