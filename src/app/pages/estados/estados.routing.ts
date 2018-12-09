import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EstadosComponent } from './estados.component';
import {EstadosTableComponent } from './components/estados-table/estados-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EstadosComponent,
    children: [
      { path: 'estados-table', component: EstadosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
