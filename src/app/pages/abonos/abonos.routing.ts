import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AbonosComponent } from './abonos.component';
import {AbonosTableComponent } from './components/abonos-table/abonos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AbonosComponent,
    children: [
      { path: 'abonos-table', component: AbonosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
