import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {OrdensComponent } from './ordens.component';
import {OrdensTableComponent } from './components/ordens-table/ordens-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: OrdensComponent,
    children: [
      { path: 'ordens-table', component: OrdensTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
