import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './accuracyestimacions.routing';
import { AccuracyestimacionsComponent } from './accuracyestimacions.component';
import { AccuracyestimacionsService } from './components/accuracyestimacions-table/accuracyestimacions.service';
import { AccuracyestimacionsTableComponent } from './components/accuracyestimacions-table/accuracyestimacions-table.component';

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
    AccuracyestimacionsComponent,
    AccuracyestimacionsTableComponent,
  ],
  entryComponents: [
  ],
  providers: [
    AccuracyestimacionsService
  ]
})
export class AccuracyestimacionsModule {
}
