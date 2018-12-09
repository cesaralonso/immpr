import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ConceptosComponent } from './conceptos.component';
import {ConceptosTableComponent } from './components/conceptos-table/conceptos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ConceptosComponent,
    children: [
      { path: 'conceptos-table', component: ConceptosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
