import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TipopreciosComponent } from './tipoprecios.component';
import {TipopreciosTableComponent } from './components/tipoprecios-table/tipoprecios-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TipopreciosComponent,
    children: [
      { path: 'tipoprecios-table', component: TipopreciosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
