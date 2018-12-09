import { SocketService } from './shared/socket.service';
import { CommonService } from './shared/common.service';
import { PrinterService } from './shared/printer.service';
import { AbonosService } from './pages/abonos/components/abonos-table/abonos.service';
import { AccuracyestimacionsService } from './pages/accuracyestimacions/components/accuracyestimacions-table/accuracyestimacions.service';
import { AccuracytiemposService } from './pages/accuracytiempos/components/accuracytiempos-table/accuracytiempos.service';
import { AlertasService } from './pages/alertas/components/alertas-table/alertas.service';
import { ArchivosService } from './pages/archivos/components/archivos-table/archivos.service';
import { AreasService } from './pages/areas/components/areas-table/areas.service';
import { CheckoutsService } from './pages/checkouts/components/checkouts-table/checkouts.service';
import { CheckoutestadosService } from './pages/checkoutestados/components/checkoutestados-table/checkoutestados.service';
import { CiudadsService } from './pages/ciudads/components/ciudads-table/ciudads.service';
import { ClientesService } from './pages/clientes/components/clientes-table/clientes.service';
import { ConceptosService } from './pages/conceptos/components/conceptos-table/conceptos.service';
import { CortesService } from './pages/cortes/components/cortes-table/cortes.service';
import { EgresoconceptosService } from './pages/egresoconceptos/components/egresoconceptos-table/egresoconceptos.service';
import { EmpleadosService } from './pages/empleados/components/empleados-table/empleados.service';
import { EmpleadotareasService } from './pages/empleadotareas/components/empleadotareas-table/empleadotareas.service';
import { EmpleadotareaestadosService } from './pages/empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados.service';
import { EstadosService } from './pages/estados/components/estados-table/estados.service';
import { EstadoscrumsService } from './pages/estadoscrums/components/estadoscrums-table/estadoscrums.service';
import { FormulasService } from './pages/formulas/components/formulas-table/formulas.service';
import { OrdensService } from './pages/ordens/components/ordens-table/ordens.service';
import { OrdenestadosService } from './pages/ordenestados/components/ordenestados-table/ordenestados.service';
import { OrdenproductosService } from './pages/ordenproductos/components/ordenproductos-table/ordenproductos.service';
import { OrdentareasService } from './pages/ordentareas/components/ordentareas-table/ordentareas.service';
import { OrdentareaestadosService } from './pages/ordentareaestados/components/ordentareaestados-table/ordentareaestados.service';
import { PersonasService } from './pages/personas/components/personas-table/personas.service';
import { ProductosService } from './pages/productos/components/productos-table/productos.service';
import { RegistradorasService } from './pages/registradoras/components/registradoras-table/registradoras.service';
import { SalidastocksService } from './pages/salidastocks/components/salidastocks-table/salidastocks.service';
import { SexosService } from './pages/sexos/components/sexos-table/sexos.service';
import { Si_modulosService } from './pages/si_modulos/components/si_modulos-table/si_modulos.service';
import { Si_permisosService } from './pages/si_permisos/components/si_permisos-table/si_permisos.service';
import { Si_reportesService } from './pages/si_reportes/components/si_reportes-table/si_reportes.service';
import { Si_rolsService } from './pages/si_rols/components/si_rols-table/si_rols.service';
import { Si_usersService } from './pages/si_users/components/si_users-table/si_users.service';
import { StocksService } from './pages/stocks/components/stocks-table/stocks.service';
import { TareasService } from './pages/tareas/components/tareas-table/tareas.service';
import { TicketsService } from './pages/tickets/components/tickets-table/tickets.service';
import { TipoalertasService } from './pages/tipoalertas/components/tipoalertas-table/tipoalertas.service';
import { TipopreciosService } from './pages/tipoprecios/components/tipoprecios-table/tipoprecios.service';
import { AbonosAddModalComponent } from './pages/abonos/components/abonos-table/abonos-add-modal/abonos-add-modal.component';
import { AccuracyestimacionsAddModalComponent } from './pages/accuracyestimacions/components/accuracyestimacions-table/accuracyestimacions-add-modal/accuracyestimacions-add-modal.component';
import { AccuracytiemposAddModalComponent } from './pages/accuracytiempos/components/accuracytiempos-table/accuracytiempos-add-modal/accuracytiempos-add-modal.component';
import { AlertasAddModalComponent } from './pages/alertas/components/alertas-table/alertas-add-modal/alertas-add-modal.component';
import { ArchivosAddModalComponent } from './pages/archivos/components/archivos-table/archivos-add-modal/archivos-add-modal.component';
import { AreasAddModalComponent } from './pages/areas/components/areas-table/areas-add-modal/areas-add-modal.component';
import { CheckoutsAddModalComponent } from './pages/checkouts/components/checkouts-table/checkouts-add-modal/checkouts-add-modal.component';
import { CheckoutestadosAddModalComponent } from './pages/checkoutestados/components/checkoutestados-table/checkoutestados-add-modal/checkoutestados-add-modal.component';
import { CiudadsAddModalComponent } from './pages/ciudads/components/ciudads-table/ciudads-add-modal/ciudads-add-modal.component';
import { ClientesAddModalComponent } from './pages/clientes/components/clientes-table/clientes-add-modal/clientes-add-modal.component';
import { ConceptosAddModalComponent } from './pages/conceptos/components/conceptos-table/conceptos-add-modal/conceptos-add-modal.component';
import { CortesAddModalComponent } from './pages/cortes/components/cortes-table/cortes-add-modal/cortes-add-modal.component';
import { EgresoconceptosAddModalComponent } from './pages/egresoconceptos/components/egresoconceptos-table/egresoconceptos-add-modal/egresoconceptos-add-modal.component';
import { EmpleadosAddModalComponent } from './pages/empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';
import { EmpleadotareasAddModalComponent } from './pages/empleadotareas/components/empleadotareas-table/empleadotareas-add-modal/empleadotareas-add-modal.component';
import { EmpleadotareaestadosAddModalComponent } from './pages/empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados-add-modal/empleadotareaestados-add-modal.component';
import { EstadosAddModalComponent } from './pages/estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { EstadoscrumsAddModalComponent } from './pages/estadoscrums/components/estadoscrums-table/estadoscrums-add-modal/estadoscrums-add-modal.component';
import { FormulasAddModalComponent } from './pages/formulas/components/formulas-table/formulas-add-modal/formulas-add-modal.component';
import { OrdensAddModalComponent } from './pages/ordens/components/ordens-table/ordens-add-modal/ordens-add-modal.component';
import { OrdenestadosAddModalComponent } from './pages/ordenestados/components/ordenestados-table/ordenestados-add-modal/ordenestados-add-modal.component';
import { OrdenproductosAddModalComponent } from './pages/ordenproductos/components/ordenproductos-table/ordenproductos-add-modal/ordenproductos-add-modal.component';
import { OrdentareasAddModalComponent } from './pages/ordentareas/components/ordentareas-table/ordentareas-add-modal/ordentareas-add-modal.component';
import { OrdentareaestadosAddModalComponent } from './pages/ordentareaestados/components/ordentareaestados-table/ordentareaestados-add-modal/ordentareaestados-add-modal.component';
import { PersonasAddModalComponent } from './pages/personas/components/personas-table/personas-add-modal/personas-add-modal.component';
import { ProductosAddModalComponent } from './pages/productos/components/productos-table/productos-add-modal/productos-add-modal.component';
import { RegistradorasAddModalComponent } from './pages/registradoras/components/registradoras-table/registradoras-add-modal/registradoras-add-modal.component';
import { SalidastocksAddModalComponent } from './pages/salidastocks/components/salidastocks-table/salidastocks-add-modal/salidastocks-add-modal.component';
import { SexosAddModalComponent } from './pages/sexos/components/sexos-table/sexos-add-modal/sexos-add-modal.component';
import { Si_modulosAddModalComponent } from './pages/si_modulos/components/si_modulos-table/si_modulos-add-modal/si_modulos-add-modal.component';
import { Si_permisosAddModalComponent } from './pages/si_permisos/components/si_permisos-table/si_permisos-add-modal/si_permisos-add-modal.component';
import { Si_reportesAddModalComponent } from './pages/si_reportes/components/si_reportes-table/si_reportes-add-modal/si_reportes-add-modal.component';
import { Si_rolsAddModalComponent } from './pages/si_rols/components/si_rols-table/si_rols-add-modal/si_rols-add-modal.component';
import { Si_usersAddModalComponent } from './pages/si_users/components/si_users-table/si_users-add-modal/si_users-add-modal.component';
import { StocksAddModalComponent } from './pages/stocks/components/stocks-table/stocks-add-modal/stocks-add-modal.component';
import { TareasAddModalComponent } from './pages/tareas/components/tareas-table/tareas-add-modal/tareas-add-modal.component';
import { TicketsAddModalComponent } from './pages/tickets/components/tickets-table/tickets-add-modal/tickets-add-modal.component';
import { TipoalertasAddModalComponent } from './pages/tipoalertas/components/tipoalertas-table/tipoalertas-add-modal/tipoalertas-add-modal.component';
import { TipopreciosAddModalComponent } from './pages/tipoprecios/components/tipoprecios-table/tipoprecios-add-modal/tipoprecios-add-modal.component';
import { AbonosEditModalComponent } from './pages/abonos/components/abonos-table/abonos-edit-modal/abonos-edit-modal.component';
import { AccuracyestimacionsEditModalComponent } from './pages/accuracyestimacions/components/accuracyestimacions-table/accuracyestimacions-edit-modal/accuracyestimacions-edit-modal.component';
import { AccuracytiemposEditModalComponent } from './pages/accuracytiempos/components/accuracytiempos-table/accuracytiempos-edit-modal/accuracytiempos-edit-modal.component';
import { AlertasEditModalComponent } from './pages/alertas/components/alertas-table/alertas-edit-modal/alertas-edit-modal.component';
import { ArchivosEditModalComponent } from './pages/archivos/components/archivos-table/archivos-edit-modal/archivos-edit-modal.component';
import { AreasEditModalComponent } from './pages/areas/components/areas-table/areas-edit-modal/areas-edit-modal.component';
import { CheckoutsEditModalComponent } from './pages/checkouts/components/checkouts-table/checkouts-edit-modal/checkouts-edit-modal.component';
import { CheckoutestadosEditModalComponent } from './pages/checkoutestados/components/checkoutestados-table/checkoutestados-edit-modal/checkoutestados-edit-modal.component';
import { CiudadsEditModalComponent } from './pages/ciudads/components/ciudads-table/ciudads-edit-modal/ciudads-edit-modal.component';
import { ClientesEditModalComponent } from './pages/clientes/components/clientes-table/clientes-edit-modal/clientes-edit-modal.component';
import { ConceptosEditModalComponent } from './pages/conceptos/components/conceptos-table/conceptos-edit-modal/conceptos-edit-modal.component';
import { CortesEditModalComponent } from './pages/cortes/components/cortes-table/cortes-edit-modal/cortes-edit-modal.component';
import { EgresoconceptosEditModalComponent } from './pages/egresoconceptos/components/egresoconceptos-table/egresoconceptos-edit-modal/egresoconceptos-edit-modal.component';
import { EmpleadosEditModalComponent } from './pages/empleados/components/empleados-table/empleados-edit-modal/empleados-edit-modal.component';
import { EmpleadotareasEditModalComponent } from './pages/empleadotareas/components/empleadotareas-table/empleadotareas-edit-modal/empleadotareas-edit-modal.component';
import { EmpleadotareaestadosEditModalComponent } from './pages/empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados-edit-modal/empleadotareaestados-edit-modal.component';
import { EstadosEditModalComponent } from './pages/estados/components/estados-table/estados-edit-modal/estados-edit-modal.component';
import { EstadoscrumsEditModalComponent } from './pages/estadoscrums/components/estadoscrums-table/estadoscrums-edit-modal/estadoscrums-edit-modal.component';
import { FormulasEditModalComponent } from './pages/formulas/components/formulas-table/formulas-edit-modal/formulas-edit-modal.component';
import { OrdensEditModalComponent } from './pages/ordens/components/ordens-table/ordens-edit-modal/ordens-edit-modal.component';
import { OrdenestadosEditModalComponent } from './pages/ordenestados/components/ordenestados-table/ordenestados-edit-modal/ordenestados-edit-modal.component';
import { OrdenproductosEditModalComponent } from './pages/ordenproductos/components/ordenproductos-table/ordenproductos-edit-modal/ordenproductos-edit-modal.component';
import { OrdentareasEditModalComponent } from './pages/ordentareas/components/ordentareas-table/ordentareas-edit-modal/ordentareas-edit-modal.component';
import { OrdentareaestadosEditModalComponent } from './pages/ordentareaestados/components/ordentareaestados-table/ordentareaestados-edit-modal/ordentareaestados-edit-modal.component';
import { PersonasEditModalComponent } from './pages/personas/components/personas-table/personas-edit-modal/personas-edit-modal.component';
import { ProductosEditModalComponent } from './pages/productos/components/productos-table/productos-edit-modal/productos-edit-modal.component';
import { RegistradorasEditModalComponent } from './pages/registradoras/components/registradoras-table/registradoras-edit-modal/registradoras-edit-modal.component';
import { SalidastocksEditModalComponent } from './pages/salidastocks/components/salidastocks-table/salidastocks-edit-modal/salidastocks-edit-modal.component';
import { SexosEditModalComponent } from './pages/sexos/components/sexos-table/sexos-edit-modal/sexos-edit-modal.component';
import { Si_modulosEditModalComponent } from './pages/si_modulos/components/si_modulos-table/si_modulos-edit-modal/si_modulos-edit-modal.component';
import { Si_permisosEditModalComponent } from './pages/si_permisos/components/si_permisos-table/si_permisos-edit-modal/si_permisos-edit-modal.component';
import { Si_reportesEditModalComponent } from './pages/si_reportes/components/si_reportes-table/si_reportes-edit-modal/si_reportes-edit-modal.component';
import { Si_rolsEditModalComponent } from './pages/si_rols/components/si_rols-table/si_rols-edit-modal/si_rols-edit-modal.component';
import { Si_usersEditModalComponent } from './pages/si_users/components/si_users-table/si_users-edit-modal/si_users-edit-modal.component';
import { StocksEditModalComponent } from './pages/stocks/components/stocks-table/stocks-edit-modal/stocks-edit-modal.component';
import { TareasEditModalComponent } from './pages/tareas/components/tareas-table/tareas-edit-modal/tareas-edit-modal.component';
import { TicketsEditModalComponent } from './pages/tickets/components/tickets-table/tickets-edit-modal/tickets-edit-modal.component';
import { TipoalertasEditModalComponent } from './pages/tipoalertas/components/tipoalertas-table/tipoalertas-edit-modal/tipoalertas-edit-modal.component';
import { TipopreciosEditModalComponent } from './pages/tipoprecios/components/tipoprecios-table/tipoprecios-edit-modal/tipoprecios-edit-modal.component';
import { FilesUploadModalService } from './shared/components/files-upload-modal/file-upload-modal.service';
import { UploadModalService } from './shared/components/upload-modal/upload-modal.service';
import { FilesUploadModalComponent } from './shared/components/files-upload-modal/files-upload-modal.component';
import { UploadModalComponent } from './shared/components/upload-modal/upload-modal.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './shared/auth-localstorage.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';





import { DndModule } from 'ngx-drag-drop';





/*
* Platform and Environment providers/directives/pipes
*/
import { routing } from './app.routing';
// Configuración
import { Configuration } from './app.constants';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        tokenGetter: (() => sessionStorage.getItem('token')),
        globalHeaders: [{'Content-Type':'application/json'}],
    }), http, options);
}
// Application wide providers
const APP_PROVIDERS = [
AppState,
GlobalState,
Configuration,
];

export type StoreType = {
state: InternalStateType,
restoreInputValues: () => void,
disposeOldHosts: () => void,
};

/**
* `AppModule` is the main entry point into Angular2's bootstraping process
*/
@NgModule({
bootstrap: [App],
declarations: [
    App,
    AbonosAddModalComponent,
    AccuracyestimacionsAddModalComponent,
    AccuracytiemposAddModalComponent,
    AlertasAddModalComponent,
    ArchivosAddModalComponent,
    AreasAddModalComponent,
    CheckoutsAddModalComponent,
    CheckoutestadosAddModalComponent,
    CiudadsAddModalComponent,
    ClientesAddModalComponent,
    ConceptosAddModalComponent,
    CortesAddModalComponent,
    EgresoconceptosAddModalComponent,
    EmpleadosAddModalComponent,
    EmpleadotareasAddModalComponent,
    EmpleadotareaestadosAddModalComponent,
    EstadosAddModalComponent,
    EstadoscrumsAddModalComponent,
    FormulasAddModalComponent,
    OrdensAddModalComponent,
    OrdenestadosAddModalComponent,
    OrdenproductosAddModalComponent,
    OrdentareasAddModalComponent,
    OrdentareaestadosAddModalComponent,
    PersonasAddModalComponent,
    ProductosAddModalComponent,
    RegistradorasAddModalComponent,
    SalidastocksAddModalComponent,
    SexosAddModalComponent,
    Si_modulosAddModalComponent,
    Si_permisosAddModalComponent,
    Si_reportesAddModalComponent,
    Si_rolsAddModalComponent,
    Si_usersAddModalComponent,
    StocksAddModalComponent,
    TareasAddModalComponent,
    TicketsAddModalComponent,
    TipoalertasAddModalComponent,
    TipopreciosAddModalComponent,
    AbonosEditModalComponent,
    AccuracyestimacionsEditModalComponent,
    AccuracytiemposEditModalComponent,
    AlertasEditModalComponent,
    ArchivosEditModalComponent,
    AreasEditModalComponent,
    CheckoutsEditModalComponent,
    CheckoutestadosEditModalComponent,
    CiudadsEditModalComponent,
    ClientesEditModalComponent,
    ConceptosEditModalComponent,
    CortesEditModalComponent,
    EgresoconceptosEditModalComponent,
    EmpleadosEditModalComponent,
    EmpleadotareasEditModalComponent,
    EmpleadotareaestadosEditModalComponent,
    EstadosEditModalComponent,
    EstadoscrumsEditModalComponent,
    FormulasEditModalComponent,
    OrdensEditModalComponent,
    OrdenestadosEditModalComponent,
    OrdenproductosEditModalComponent,
    OrdentareasEditModalComponent,
    OrdentareaestadosEditModalComponent,
    PersonasEditModalComponent,
    ProductosEditModalComponent,
    RegistradorasEditModalComponent,
    SalidastocksEditModalComponent,
    SexosEditModalComponent,
    Si_modulosEditModalComponent,
    Si_permisosEditModalComponent,
    Si_reportesEditModalComponent,
    Si_rolsEditModalComponent,
    Si_usersEditModalComponent,
    StocksEditModalComponent,
    TareasEditModalComponent,
    TicketsEditModalComponent,
    TipoalertasEditModalComponent,
    TipopreciosEditModalComponent,
    UploadModalComponent,
    FilesUploadModalComponent,


],
imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    LocalStorageModule.withConfig({
        prefix: 'imprenzzaregistradora_5ab30eb011b97',
        storageType: 'localStorage',
    }),
    BootstrapModalModule.forRoot({ container: document.body }),
    
    DndModule,
],
entryComponents: [
    AbonosAddModalComponent,
    AccuracyestimacionsAddModalComponent,
    AccuracytiemposAddModalComponent,
    AlertasAddModalComponent,
    ArchivosAddModalComponent,
    AreasAddModalComponent,
    CheckoutsAddModalComponent,
    CheckoutestadosAddModalComponent,
    CiudadsAddModalComponent,
    ClientesAddModalComponent,
    ConceptosAddModalComponent,
    CortesAddModalComponent,
    EgresoconceptosAddModalComponent,
    EmpleadosAddModalComponent,
    EmpleadotareasAddModalComponent,
    EmpleadotareaestadosAddModalComponent,
    EstadosAddModalComponent,
    EstadoscrumsAddModalComponent,
    FormulasAddModalComponent,
    OrdensAddModalComponent,
    OrdenestadosAddModalComponent,
    OrdenproductosAddModalComponent,
    OrdentareasAddModalComponent,
    OrdentareaestadosAddModalComponent,
    PersonasAddModalComponent,
    ProductosAddModalComponent,
    RegistradorasAddModalComponent,
    SalidastocksAddModalComponent,
    SexosAddModalComponent,
    Si_modulosAddModalComponent,
    Si_permisosAddModalComponent,
    Si_reportesAddModalComponent,
    Si_rolsAddModalComponent,
    Si_usersAddModalComponent,
    StocksAddModalComponent,
    TareasAddModalComponent,
    TicketsAddModalComponent,
    TipoalertasAddModalComponent,
    TipopreciosAddModalComponent,
    AbonosEditModalComponent,
    AccuracyestimacionsEditModalComponent,
    AccuracytiemposEditModalComponent,
    AlertasEditModalComponent,
    ArchivosEditModalComponent,
    AreasEditModalComponent,
    CheckoutsEditModalComponent,
    CheckoutestadosEditModalComponent,
    CiudadsEditModalComponent,
    ClientesEditModalComponent,
    ConceptosEditModalComponent,
    CortesEditModalComponent,
    EgresoconceptosEditModalComponent,
    EmpleadosEditModalComponent,
    EmpleadotareasEditModalComponent,
    EmpleadotareaestadosEditModalComponent,
    EstadosEditModalComponent,
    EstadoscrumsEditModalComponent,
    FormulasEditModalComponent,
    OrdensEditModalComponent,
    OrdenestadosEditModalComponent,
    OrdenproductosEditModalComponent,
    OrdentareasEditModalComponent,
    OrdentareaestadosEditModalComponent,
    PersonasEditModalComponent,
    ProductosEditModalComponent,
    RegistradorasEditModalComponent,
    SalidastocksEditModalComponent,
    SexosEditModalComponent,
    Si_modulosEditModalComponent,
    Si_permisosEditModalComponent,
    Si_reportesEditModalComponent,
    Si_rolsEditModalComponent,
    Si_usersEditModalComponent,
    StocksEditModalComponent,
    TareasEditModalComponent,
    TicketsEditModalComponent,
    TipoalertasEditModalComponent,
    TipopreciosEditModalComponent,
    UploadModalComponent,
    FilesUploadModalComponent
],
providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    AuthGuard,
    AuthService,
    AuthLocalstorage,
    PrinterService,
    CommonService,
    FilesUploadModalService,
    UploadModalService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AbonosService,
    AccuracyestimacionsService,
    AccuracytiemposService,
    AlertasService,
    ArchivosService,
    AreasService,
    CheckoutsService,
    CheckoutestadosService,
    CiudadsService,
    ClientesService,
    ConceptosService,
    CortesService,
    EgresoconceptosService,
    EmpleadosService,
    EmpleadotareasService,
    EmpleadotareaestadosService,
    EstadosService,
    EstadoscrumsService,
    FormulasService,
    OrdensService,
    OrdenestadosService,
    OrdenproductosService,
    OrdentareasService,
    OrdentareaestadosService,
    PersonasService,
    ProductosService,
    RegistradorasService,
    SalidastocksService,
    SexosService,
    Si_modulosService,
    Si_permisosService,
    Si_reportesService,
    Si_rolsService,
    Si_usersService,
    StocksService,
    TareasService,
    TicketsService,
    TipoalertasService,
    TipopreciosService,
    SocketService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
]
})

export class AppModule {

constructor(public appState: AppState) {
}
}
