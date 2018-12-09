import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CiudadsComponent } from './ciudads.component';
import {CiudadsTableComponent } from './components/ciudads-table/ciudads-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CiudadsComponent,
    children: [
      { path: 'ciudads-table', component: CiudadsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
