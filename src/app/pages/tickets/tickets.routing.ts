import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TicketsComponent } from './tickets.component';
import {TicketsTableComponent } from './components/tickets-table/tickets-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    children: [
      { path: 'tickets-table', component: TicketsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
