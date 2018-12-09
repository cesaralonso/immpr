import { AuthService } from './../../../../shared/auth.service';
import { PrinterService } from './../../../../shared/printer.service';
import { CommonService } from './../../../../shared/common.service';
import { EmpleadotareasAddModalComponent } from './../../../empleadotareas/components/empleadotareas-table/empleadotareas-add-modal/empleadotareas-add-modal.component';
import { EmpleadotareasInterface } from './../../../empleadotareas/components/empleadotareas-table/empleadotareas.interface';
import { ClientesService } from './../../../clientes/components/clientes-table/clientes.service';
import { EstadosService } from './../../../estados/components/estados-table/estados.service';
import { OrdentareasAddModalComponent } from './../../../ordentareas/components/ordentareas-table/ordentareas-add-modal/ordentareas-add-modal.component';
import { OrdentareasInterface } from './../../../ordentareas/components/ordentareas-table/ordentareas.interface';
import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { colorHelper } from './../../../../theme/theme.constants';
import { TelefonoCasaFilterPipe } from './../../../../theme/pipes/shared/telefonoCasa-filter.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { OrdensInterface } from './ordens.interface';
import { OrdensResponseInterface } from './ordens-response.interface';
import { Component, OnInit } from '@angular/core';
import { OrdensService } from './ordens.service';
import { OrdensAddModalComponent } from './ordens-add-modal/ordens-add-modal.component';
import { OrdensEditModalComponent } from './ordens-edit-modal/ordens-edit-modal.component';
import { AbonosInterface } from './../../../abonos/components/abonos-table/abonos.interface';
import { AbonosAddModalComponent } from './../../../abonos/components/abonos-table/abonos-add-modal/abonos-add-modal.component';
import { OrdenestadosInterface } from './../../../ordenestados/components/ordenestados-table/ordenestados.interface';
import { OrdenestadosAddModalComponent } from './../../../ordenestados/components/ordenestados-table/ordenestados-add-modal/ordenestados-add-modal.component';
import { OrdenproductosInterface } from './../../../ordenproductos/components/ordenproductos-table/ordenproductos.interface';
import { OrdenproductosAddModalComponent } from './../../../ordenproductos/components/ordenproductos-table/ordenproductos-add-modal/ordenproductos-add-modal.component';

// import ExportToCSV from "@molteni/export-csv";

import * as _ from 'lodash';


@Component({
selector: 'ordens-table',
templateUrl: './ordens-table.html',
styleUrls: ['./ordens-table.scss'],
})
export class OrdensTableComponent implements OnInit {

    _estado: string[] = [];
    _cliente: string[] = [];

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idorden';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: OrdensService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private estadosService: EstadosService,
      private clientesService: ClientesService,
      private commonService: CommonService,
      private printerService: PrinterService,
      private authService: AuthService,
      private route: ActivatedRoute, 
      private router: Router,
      private authLocalstorage: AuthLocalstorage) {
        
      // Buscar permisos del usuario en el módulo
      const user = this.authService.useJwtHelper();
      
      if (user.super) {
        this.updateable = true;
        this.deleteable = true;
        this.writeable = true;
      } else {
        const userModules = this.authService.getUserModules();
        if (userModules[0]) {
          for (const element in userModules) {
            if (userModules[element].path === '/pages/ordens') {
              this.updateable = userModules[element].updateable;
              this.deleteable = userModules[element].deleteable;
              this.writeable = userModules[element].writeable;
            }
          }
        }
      }
    }
    ngOnInit() {
      this.refill();
      this.getEstado();
      this.getCliente();
    }

    refill() {
      this.route.params.subscribe(params => {
        if (params['idorden'] !== undefined) {
          const idorden = +params['idorden'];
          this.findById(idorden);
          this.backpage = true;
        }
        if (params['idcliente'] !== undefined) {
          const idcliente = +params['idcliente'];
          this.findByIdCliente(idcliente);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }

    descargarCSV(json, reportTitle, showLabel) {
      this.commonService.JSONToCSVConvertor(json, reportTitle, showLabel);
    }

    expandMessage (item) {
      item.expanded = !item.expanded;
    }

    getEstado() {
        this.estadosService.all()
        .subscribe(
            (data: any) => this._estado = data.result,
        );
    }

    getCliente() {
        this.clientesService.all()
        .subscribe(
            (data: any) => this._cliente = data.result,
        );
    }

    insertOrdentarea(ordenproductos: OrdenproductosInterface) {
      const ordentarea: OrdentareasInterface = {
        ordenproducto_idordenproducto: ordenproductos.idordenproducto,
      };

      const disposable = this.dialogService.addDialog(OrdentareasAddModalComponent, ordentarea)
      .subscribe( data => {
          if (data) {
          this.ordentareaShowToast(data);
          }
      });
    }

    ordentareaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);

            this.refill();

        } else {
            this.toastrService.error(result.message);
        }
    }

    viewOrdentarea(ordenproductos: OrdenproductosInterface) {
      this.router.navigate([`/pages/ordentareas/ordenproducto/${ordenproductos.idordenproducto}`]);
    }

    entregarOrden(ordens: OrdensInterface) {
      this.service.entregarOrden(ordens)
        .subscribe(
           (data: OrdensResponseInterface) => {
                if (data.success) {

                  this.toastrService.success(data.message);

                  this.refill();
      
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'));
    }

    finalizarOrden(ordens: OrdensInterface) {
      this.service.finalizarOrden(ordens)
        .subscribe(
           (data: OrdensResponseInterface) => {
                if (data.success) {

                  this.toastrService.success(data.message);

                  this.refill();

                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'));
    }

    printOrden(ordens: any) {
      this.printerService.printOrden(ordens);
    }

    printReporte(ordens: any) {
      this.printerService.printReporte(ordens);
    }

    insertEmpleadotarea(ordentareas: OrdentareasInterface) {
      const empleadotarea: EmpleadotareasInterface = {
        ordentarea_idordentarea: ordentareas.idordentarea
      };
      const disposable = this.dialogService.addDialog(EmpleadotareasAddModalComponent, empleadotarea)
      .subscribe( data => {
          if (data) {
          this.empleadotareaShowToast(data);
          }
      });
    }

    empleadotareaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);

            // RECARGA TABLA
            this.refill();

        } else {
            this.toastrService.error(result.message);
        }
    }

    private findById(id: number): void {
      this.service
        .findById(id)
        .subscribe(
            (data: OrdensResponseInterface) => {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }

    private findByIdCliente(id: number): void {
      this.service
        .findByIdCliente(id)
        .subscribe(
            (data: OrdensResponseInterface) => {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }

    backPage() {
        window.history.back();
    }

    insertAbono(ordens: OrdensInterface) {

      // Abono
      const abono: AbonosInterface = {
        'orden_idorden': ordens.idorden,
        'adeudoAnterior': ordens.adeudo
      };

      const disposable = this.dialogService.addDialog(AbonosAddModalComponent, abono)
      .subscribe( data => {
          if (data) {
          this.abonoShowToast(data, ordens.idorden);
          }
      });
    }

    abonoShowToast(data, idorden) {
        if (data.success) {
            this.toastrService.success(data.message);

            // ACTUALIZAR MONTOS CON Orden  
            this.service
              .updateMontos(idorden)
              .subscribe(
                  (_data: OrdensResponseInterface) => {
                      if (data.success) {
                        this.showToast(_data);
                      } else {
                        this.toastrService.error(_data.message);
                      }
                  },
                  error => console.log(error),
                  () => console.log('Get all Items complete'))

        } else {
            this.toastrService.error(data.message);
        }
    }

    viewAbono(ordens: OrdensInterface) {
      this.router.navigate([`/pages/abonos/orden/${ordens.idorden}`]);
    }

    insertOrdenestado(ordens: OrdensInterface) {
      const ordenestado: OrdenestadosInterface = {
        orden_idorden: ordens.idorden
      };

      const disposable = this.dialogService.addDialog(OrdenestadosAddModalComponent, ordenestado)
      .subscribe( data => {
          if (data) {
          this.ordenestadoShowToast(data);
          }
      });
    }

    ordenestadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
            this.getAll();
        } else {
            this.toastrService.error(result.message);
        }
    }

    viewOrdenestado(ordens: OrdensInterface) {
      this.router.navigate([`/pages/ordenestados/orden/${ordens.idorden}`]);
    }

    insertOrdenproducto(ordens: OrdensInterface) {
      const ordenproducto: OrdenproductosInterface = {
        orden_idorden: ordens.idorden
      };
      
      const disposable = this.dialogService.addDialog(OrdenproductosAddModalComponent, ordenproducto)
      .subscribe( data => {
          if (data) {
            this.ordenproductoShowToast(data, ordens.idorden);
          }
      });
    }

    ordenproductoShowToast(data, idorden) {
        if (data.success) {
            this.toastrService.success(data.message);

            // RECARGA TABLA
            this.refill();
      
        } else {
            this.toastrService.error(data.message);
        }
    }

    viewOrdenproducto(ordens: OrdensInterface) {
      this.router.navigate([`/pages/ordenproductos/orden/${ordens.idorden}`]);
    }

    addModalShow() {
      const disposable = this.dialogService.addDialog(OrdensAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }

    editModalShow(ordens: OrdensInterface) {
      const disposable = this.dialogService.addDialog(OrdensEditModalComponent, ordens)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }

    onDeleteConfirm(event, item): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
          this.service.remove(item.idorden)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }

    showToast(result) {
      if (result.success) {
        this.toastrService.success(result.message);

        // RECARGA TABLA
        this.refill();
      
      } else {
        this.toastrService.error(result.message);
      }
    }
    
    filtrarFechas(fechaDesde, fechaHasta) {
      this.service
        .allFromTo(fechaDesde, fechaHasta)
        .subscribe(
            (data: OrdensResponseInterface) =>  {
                if (data.success) {
                  const result = _.chain(data.result)
                    .sortBy('estado_estado_idestado')
                    .sortBy('idorden')
                    .value();

                  this.data = result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: OrdensResponseInterface) =>  {
                if (data.success) {
                  const result = _.chain(data.result)
                    .sortBy('estado_estado_idestado')
                    .sortBy('idorden')
                    .value();

                  this.data = result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
