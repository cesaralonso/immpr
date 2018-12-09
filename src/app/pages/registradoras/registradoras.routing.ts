import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {RegistradorasComponent } from './registradoras.component';
import {RegistradorasTableComponent } from './components/registradoras-table/registradoras-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: RegistradorasComponent,
    children: [
      { path: 'registradoras-table', component: RegistradorasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
