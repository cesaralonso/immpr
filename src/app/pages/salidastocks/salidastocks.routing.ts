import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {SalidastocksComponent } from './salidastocks.component';
import {SalidastocksTableComponent } from './components/salidastocks-table/salidastocks-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: SalidastocksComponent,
    children: [
      { path: 'salidastocks-table', component: SalidastocksTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
