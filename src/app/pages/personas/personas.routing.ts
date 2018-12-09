import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PersonasComponent } from './personas.component';
import {PersonasTableComponent } from './components/personas-table/personas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PersonasComponent,
    children: [
      { path: 'personas-table', component: PersonasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
