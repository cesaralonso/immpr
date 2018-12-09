import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ProductosComponent } from './productos.component';
import {ProductosTableComponent } from './components/productos-table/productos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    children: [
      { path: 'productos-table', component: ProductosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
