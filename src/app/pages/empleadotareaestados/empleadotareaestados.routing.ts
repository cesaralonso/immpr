import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EmpleadotareaestadosComponent } from './empleadotareaestados.component';
import {EmpleadotareaestadosTableComponent } from './components/empleadotareaestados-table/empleadotareaestados-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EmpleadotareaestadosComponent,
    children: [
      { path: 'empleadotareaestados-table', component: EmpleadotareaestadosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
