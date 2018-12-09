import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './empleadotareaestados.routing';
import { EmpleadotareaestadosComponent } from './empleadotareaestados.component';
import { EmpleadotareaestadosService } from './components/empleadotareaestados-table/empleadotareaestados.service';
import { EmpleadotareaestadosTableComponent } from './components/empleadotareaestados-table/empleadotareaestados-table.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })
  ],
  declarations: [
    EmpleadotareaestadosComponent,
    EmpleadotareaestadosTableComponent,
  ],
  entryComponents: [
  ],
  providers: [
    EmpleadotareaestadosService
  ]
})
export class EmpleadotareaestadosModule {
}
