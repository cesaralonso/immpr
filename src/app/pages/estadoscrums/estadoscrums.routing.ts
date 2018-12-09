import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EstadoscrumsComponent } from './estadoscrums.component';
import {EstadoscrumsTableComponent } from './components/estadoscrums-table/estadoscrums-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EstadoscrumsComponent,
    children: [
      { path: 'estadoscrums-table', component: EstadoscrumsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
