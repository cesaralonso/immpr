import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EmpleadotareasComponent } from './empleadotareas.component';
import {EmpleadotareasTableComponent } from './components/empleadotareas-table/empleadotareas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EmpleadotareasComponent,
    children: [
      { path: 'empleadotareas-table', component: EmpleadotareasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
