import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TipoalertasInterface } from './tipoalertas.interface';
import { TipoalertasResponseInterface } from './tipoalertas-response.interface';
import { Component, OnInit } from '@angular/core';
import { TipoalertasService } from './tipoalertas.service';
import { TipoalertasAddModalComponent } from './tipoalertas-add-modal/tipoalertas-add-modal.component';
import { TipoalertasEditModalComponent } from './tipoalertas-edit-modal/tipoalertas-edit-modal.component';
import { AlertasInterface } from './../../../alertas/components/alertas-table/alertas.interface';
import { AlertasAddModalComponent } from './../../../alertas/components/alertas-table/alertas-add-modal/alertas-add-modal.component';

@Component({
selector: 'tipoalertas-table',
templateUrl: './tipoalertas-table.html',
styleUrls: ['./tipoalertas-table.scss'],
})
export class TipoalertasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtipoalerta';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: TipoalertasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertAlerta(tipoalertas: TipoalertasInterface) {
      const alerta: AlertasInterface = {
        tipoalerta_idtipoalerta: tipoalertas.idtipoalerta
      }
      const disposable = this.dialogService.addDialog(AlertasAddModalComponent, alerta)
      .subscribe( data => {
          if (data) {
          this.alertaShowToast(data);
          }
      });
    }
    alertaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewAlerta(tipoalertas: TipoalertasInterface) {
      this.router.navigate([`/pages/alertas/tipoalerta/${tipoalertas.idtipoalerta}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TipoalertasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(tipoalertas: TipoalertasInterface) {
      const disposable = this.dialogService.addDialog(TipoalertasEditModalComponent, tipoalertas)
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
          this.service.remove(item.idtipoalerta)
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
            (data: TipoalertasResponseInterface) =>  {
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
