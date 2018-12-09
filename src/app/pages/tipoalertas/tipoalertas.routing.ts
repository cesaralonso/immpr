import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TipoalertasComponent } from './tipoalertas.component';
import {TipoalertasTableComponent } from './components/tipoalertas-table/tipoalertas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TipoalertasComponent,
    children: [
      { path: 'tipoalertas-table', component: TipoalertasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
