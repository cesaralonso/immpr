import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TareasComponent } from './tareas.component';
import {TareasTableComponent } from './components/tareas-table/tareas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TareasComponent,
    children: [
      { path: 'tareas-table', component: TareasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
