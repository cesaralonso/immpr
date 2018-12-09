import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {FormulasComponent } from './formulas.component';
import {FormulasTableComponent } from './components/formulas-table/formulas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: FormulasComponent,
    children: [
      { path: 'formulas-table', component: FormulasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
