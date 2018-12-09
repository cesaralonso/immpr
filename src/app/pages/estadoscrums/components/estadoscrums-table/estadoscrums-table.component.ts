import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EstadoscrumsInterface } from './estadoscrums.interface';
import { EstadoscrumsResponseInterface } from './estadoscrums-response.interface';
import { Component, OnInit } from '@angular/core';
import { EstadoscrumsService } from './estadoscrums.service';
import { EstadoscrumsAddModalComponent } from './estadoscrums-add-modal/estadoscrums-add-modal.component';
import { EstadoscrumsEditModalComponent } from './estadoscrums-edit-modal/estadoscrums-edit-modal.component';
import { EmpleadotareaestadosInterface } from './../../../empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados.interface';
import { EmpleadotareaestadosAddModalComponent } from './../../../empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados-add-modal/empleadotareaestados-add-modal.component';
import { OrdentareaestadosInterface } from './../../../ordentareaestados/components/ordentareaestados-table/ordentareaestados.interface';
import { OrdentareaestadosAddModalComponent } from './../../../ordentareaestados/components/ordentareaestados-table/ordentareaestados-add-modal/ordentareaestados-add-modal.component';

@Component({
selector: 'estadoscrums-table',
templateUrl: './estadoscrums-table.html',
styleUrls: ['./estadoscrums-table.scss'],
})
export class EstadoscrumsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idestadoscrum';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: EstadoscrumsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertEmpleadotareaestado(estadoscrums: EstadoscrumsInterface) {
      const empleadotareaestado: EmpleadotareaestadosInterface = {
        estadoscrum_idestadoscrum: estadoscrums.idestadoscrum
      }
      const disposable = this.dialogService.addDialog(EmpleadotareaestadosAddModalComponent, empleadotareaestado)
      .subscribe( data => {
          if (data) {
          this.empleadotareaestadoShowToast(data);
          }
      });
    }
    empleadotareaestadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewEmpleadotareaestado(estadoscrums: EstadoscrumsInterface) {
      this.router.navigate([`/pages/empleadotareaestados/estadoscrum/${estadoscrums.idestadoscrum}`]);
    }
    insertOrdentareaestado(estadoscrums: EstadoscrumsInterface) {
      const ordentareaestado: OrdentareaestadosInterface = {
        estadoscrum_idestadoscrum: estadoscrums.idestadoscrum
      }
      const disposable = this.dialogService.addDialog(OrdentareaestadosAddModalComponent, ordentareaestado)
      .subscribe( data => {
          if (data) {
          this.ordentareaestadoShowToast(data);
          }
      });
    }
    ordentareaestadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrdentareaestado(estadoscrums: EstadoscrumsInterface) {
      this.router.navigate([`/pages/ordentareaestados/estadoscrum/${estadoscrums.idestadoscrum}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EstadoscrumsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(estadoscrums: EstadoscrumsInterface) {
      const disposable = this.dialogService.addDialog(EstadoscrumsEditModalComponent, estadoscrums)
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
          this.service.remove(item.idestadoscrum)
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
        this.getAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: EstadoscrumsResponseInterface) =>  {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
