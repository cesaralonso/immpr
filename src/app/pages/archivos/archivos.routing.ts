import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ArchivosComponent } from './archivos.component';
import {ArchivosTableComponent } from './components/archivos-table/archivos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ArchivosComponent,
    children: [
      { path: 'archivos-table', component: ArchivosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
