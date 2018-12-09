import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './ordentareas.routing';
import { OrdentareasComponent } from './ordentareas.component';
import { OrdentareasService } from './components/ordentareas-table/ordentareas.service';
import { OrdentareasTableComponent } from './components/ordentareas-table/ordentareas-table.component';

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
    OrdentareasComponent,
    OrdentareasTableComponent,
  ],
  entryComponents: [
  ],
  providers: [
    OrdentareasService
  ]
})
export class OrdentareasModule {
}
