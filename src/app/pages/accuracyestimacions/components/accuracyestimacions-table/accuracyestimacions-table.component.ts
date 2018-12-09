import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { AccuracyestimacionsInterface } from './accuracyestimacions.interface';
import { AccuracyestimacionsResponseInterface } from './accuracyestimacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { AccuracyestimacionsService } from './accuracyestimacions.service';
import { AccuracyestimacionsAddModalComponent } from './accuracyestimacions-add-modal/accuracyestimacions-add-modal.component';
import { AccuracyestimacionsEditModalComponent } from './accuracyestimacions-edit-modal/accuracyestimacions-edit-modal.component';

@Component({
selector: 'accuracyestimacions-table',
templateUrl: './accuracyestimacions-table.html',
styleUrls: ['./accuracyestimacions-table.scss'],
})
export class AccuracyestimacionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idaccuracyestimacion';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: AccuracyestimacionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idordentarea'] !== undefined) {
          const idordentarea = +params['idordentarea'];
          this.findByIdOrdentarea(idordentarea);
          this.backpage = true;
        }
        if (params['idempleado'] !== undefined) {
          const idempleado = +params['idempleado'];
          this.findByIdEmpleado(idempleado);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    
    calcularPresicion() {
      this.service.calcularPresicion()
      .subscribe( data => {
          if (data) {
            this.showToast(data);
          }
      });
    }

    private findByIdOrdentarea(id: number): void {
      this.service
        .findByIdOrdentarea(id)
        .subscribe(
            (data: AccuracyestimacionsResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdEmpleado(id: number): void {
      this.service
        .findByIdEmpleado(id)
        .subscribe(
            (data: AccuracyestimacionsResponseInterface) => {
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
    addModalShow() {
      const disposable = this.dialogService.addDialog(AccuracyestimacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(accuracyestimacions: AccuracyestimacionsInterface) {
      const disposable = this.dialogService.addDialog(AccuracyestimacionsEditModalComponent, accuracyestimacions)
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
          this.service.remove(item.idaccuracyestimacion)
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
            (data: AccuracyestimacionsResponseInterface) =>  {
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
