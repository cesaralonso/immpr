import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {StocksComponent } from './stocks.component';
import {StocksTableComponent } from './components/stocks-table/stocks-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: StocksComponent,
    children: [
      { path: 'stocks-table', component: StocksTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
