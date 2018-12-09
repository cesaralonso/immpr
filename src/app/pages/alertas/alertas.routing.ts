import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AlertasComponent } from './alertas.component';
import { AlertasTableComponent } from './components/alertas-table/alertas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AlertasComponent,
    children: [
      { path: 'alertas-table', component: AlertasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
