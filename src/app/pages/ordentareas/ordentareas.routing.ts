import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {OrdentareasComponent } from './ordentareas.component';
import {OrdentareasTableComponent } from './components/ordentareas-table/ordentareas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: OrdentareasComponent,
    children: [
      { path: 'ordentareas-table', component: OrdentareasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
