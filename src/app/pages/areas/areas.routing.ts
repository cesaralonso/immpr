import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AreasComponent } from './areas.component';
import {AreasTableComponent } from './components/areas-table/areas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AreasComponent,
    children: [
      { path: 'areas-table', component: AreasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
