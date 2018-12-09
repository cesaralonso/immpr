import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {OrdentareaestadosComponent } from './ordentareaestados.component';
import {OrdentareaestadosTableComponent } from './components/ordentareaestados-table/ordentareaestados-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: OrdentareaestadosComponent,
    children: [
      { path: 'ordentareaestados-table', component: OrdentareaestadosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
