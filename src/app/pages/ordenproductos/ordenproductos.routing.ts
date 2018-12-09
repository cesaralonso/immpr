import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {OrdenproductosComponent } from './ordenproductos.component';
import {OrdenproductosTableComponent } from './components/ordenproductos-table/ordenproductos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: OrdenproductosComponent,
    children: [
      { path: 'ordenproductos-table', component: OrdenproductosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
