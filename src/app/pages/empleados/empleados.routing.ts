import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EmpleadosComponent } from './empleados.component';
import {EmpleadosTableComponent } from './components/empleados-table/empleados-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EmpleadosComponent,
    children: [
      { path: 'empleados-table', component: EmpleadosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
