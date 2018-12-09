import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { AppTranslationModule } from '../app.translation.module';

import {
BaThemeConfig
} from './theme.config';

import {
BaThemeConfigProvider
} from './theme.configProvider';

import {
BaAmChart,
BaBackTop,
BaCard,
BaChartistChart,
BaCheckbox,
BaContentTop,
BaFullCalendar,
BaMenuItem,
BaMenu,
BaMsgCenter,
BaMultiCheckbox,
BaPageTop,
BaPictureUploader,
BaSidebar,
BaFileUploader
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
BaScrollPosition,
BaSlimScroll,
BaThemeRun
} from './directives';

import {
BaAppPicturePipe,
BaKameleonPicturePipe,
BaProfilePicturePipe,

FechaFilterPipe,
Empleado_empleado_idempleadoFilterPipe,
Tipoalerta_tipoalerta_idtipoalertaFilterPipe,
UrlFilterPipe,
TipoFilterPipe,
Ordentarea_ordentarea_idordentareaFilterPipe,
NombreFilterPipe,
Persona_persona_idpersonaFilterPipe,
RfcFilterPipe,
RazonsocialFilterPipe,
EmailFilterPipe,
Concepto_concepto_idconceptoFilterPipe,
FechaIngresoFilterPipe,
Area_area_idareaFilterPipe,
Estado_estado_idestadoFilterPipe,
Empleadotarea_empleadotarea_idempleadotareaFilterPipe,
FormulaFilterPipe,
FechaEntregaEstimadaFilterPipe,
FechaEntregaRealFilterPipe,
FechaInicioEstimadaFilterPipe,
Cliente_cliente_idclienteFilterPipe,
ClienteFilterPipe,
TipoPrecioFilterPipe,
Producto_producto_idproductoFilterPipe,
Ordenproducto_ordenproducto_idordenproductoFilterPipe,
EspecificacionesFilterPipe,
Tarea_tarea_idtareaFilterPipe,
ApellidoPaternoFilterPipe,
ApellidoMaternoFilterPipe,
EmailPersonalFilterPipe,
TelefonoCasaFilterPipe,
TelefonoOficinaFilterPipe,
SexoFilterPipe,
CiudadFilterPipe,
ExtraPorFilterPipe,
Formula_formula_idformulaFilterPipe,
Modulo_Modulo_idsi_moduloFilterPipe,
UsuarioFilterPipe,
Rol_Rol_idsi_rolFilterPipe,
} from './pipes';

import {
BaImageLoaderService,
BaMenuService,
BaThemePreloader,
BaThemeSpinner
} from './services';

import {
EmailValidator,
EqualPasswordsValidator
} from './validators';

const NGA_COMPONENTS = [
BaAmChart,
BaBackTop,
BaCard,
BaChartistChart,
BaCheckbox,
BaContentTop,
BaFullCalendar,
BaMenuItem,
BaMenu,
BaMsgCenter,
BaMultiCheckbox,
BaPageTop,
BaPictureUploader,
BaSidebar,
BaFileUploader
];

const NGA_DIRECTIVES = [
BaScrollPosition,
BaSlimScroll,
BaThemeRun,
BaCardBlur
];

const NGA_PIPES = [
BaAppPicturePipe,
BaKameleonPicturePipe,
BaProfilePicturePipe,

FechaFilterPipe,
Empleado_empleado_idempleadoFilterPipe,
Tipoalerta_tipoalerta_idtipoalertaFilterPipe,
UrlFilterPipe,
TipoFilterPipe,
Ordentarea_ordentarea_idordentareaFilterPipe,
NombreFilterPipe,
Persona_persona_idpersonaFilterPipe,
RfcFilterPipe,
RazonsocialFilterPipe,
EmailFilterPipe,
Concepto_concepto_idconceptoFilterPipe,
FechaIngresoFilterPipe,
Area_area_idareaFilterPipe,
Estado_estado_idestadoFilterPipe,
Empleadotarea_empleadotarea_idempleadotareaFilterPipe,
FormulaFilterPipe,
FechaEntregaEstimadaFilterPipe,
FechaEntregaRealFilterPipe,
FechaInicioEstimadaFilterPipe,
Cliente_cliente_idclienteFilterPipe,
ClienteFilterPipe,
TipoPrecioFilterPipe,
Producto_producto_idproductoFilterPipe,
Ordenproducto_ordenproducto_idordenproductoFilterPipe,
EspecificacionesFilterPipe,
Tarea_tarea_idtareaFilterPipe,
ApellidoPaternoFilterPipe,
ApellidoMaternoFilterPipe,
EmailPersonalFilterPipe,
TelefonoCasaFilterPipe,
TelefonoOficinaFilterPipe,
SexoFilterPipe,
CiudadFilterPipe,
ExtraPorFilterPipe,
Formula_formula_idformulaFilterPipe,
Modulo_Modulo_idsi_moduloFilterPipe,
UsuarioFilterPipe,
Rol_Rol_idsi_rolFilterPipe,
];

const NGA_SERVICES = [
BaImageLoaderService,
BaThemePreloader,
BaThemeSpinner,
BaMenuService
];

const NGA_VALIDATORS = [
EmailValidator,
EqualPasswordsValidator
];

@NgModule({
declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
],
imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgUploaderModule
],
exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
]
})
export class NgaModule {
static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
    ngModule: NgaModule,
    providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
    ],
    };
}
}
