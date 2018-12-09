import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './ordenproductos.routing';
import { OrdenproductosComponent } from './ordenproductos.component';
import { OrdenproductosService } from './components/ordenproductos-table/ordenproductos.service';
import { OrdenproductosTableComponent } from './components/ordenproductos-table/ordenproductos-table.component';

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
    OrdenproductosComponent,
    OrdenproductosTableComponent,
  ],
  entryComponents: [
  ],
  providers: [
    OrdenproductosService
  ]
})
export class OrdenproductosModule {
}
