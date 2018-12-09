import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {SexosComponent } from './sexos.component';
import {SexosTableComponent } from './components/sexos-table/sexos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: SexosComponent,
    children: [
      { path: 'sexos-table', component: SexosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
