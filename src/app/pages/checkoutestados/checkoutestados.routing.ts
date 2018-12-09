import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CheckoutestadosComponent } from './checkoutestados.component';
import {CheckoutestadosTableComponent } from './components/checkoutestados-table/checkoutestados-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CheckoutestadosComponent,
    children: [
      { path: 'checkoutestados-table', component: CheckoutestadosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
