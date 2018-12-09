import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ClientesComponent } from './clientes.component';
import {ClientesTableComponent } from './components/clientes-table/clientes-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
      { path: 'clientes-table', component: ClientesTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
