import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {OrdenestadosComponent } from './ordenestados.component';
import {OrdenestadosTableComponent } from './components/ordenestados-table/ordenestados-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: OrdenestadosComponent,
    children: [
      { path: 'ordenestados-table', component: OrdenestadosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
