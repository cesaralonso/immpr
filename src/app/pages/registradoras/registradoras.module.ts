import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './registradoras.routing';
import { RegistradorasComponent } from './registradoras.component';
import { RegistradorasService } from './components/registradoras-table/registradoras.service';
import { RegistradorasTableComponent } from './components/registradoras-table/registradoras-table.component';

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
    RegistradorasComponent,
    RegistradorasTableComponent,
  ],
  entryComponents: [
  ],
  providers: [
    RegistradorasService
  ]
})
export class RegistradorasModule {
}
