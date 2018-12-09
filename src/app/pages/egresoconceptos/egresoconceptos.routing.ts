import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EgresoconceptosComponent } from './egresoconceptos.component';
import {EgresoconceptosTableComponent } from './components/egresoconceptos-table/egresoconceptos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EgresoconceptosComponent,
    children: [
      { path: 'egresoconceptos-table', component: EgresoconceptosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
