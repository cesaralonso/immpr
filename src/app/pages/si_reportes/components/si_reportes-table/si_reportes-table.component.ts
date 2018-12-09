import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Si_reportesInterface } from './si_reportes.interface';
import { Si_reportesResponseInterface } from './si_reportes-response.interface';
import { Component, OnInit } from '@angular/core';
import { Si_reportesService } from './si_reportes.service';
import { Si_reportesAddModalComponent } from './si_reportes-add-modal/si_reportes-add-modal.component';
import { Si_reportesEditModalComponent } from './si_reportes-edit-modal/si_reportes-edit-modal.component';

@Component({
selector: 'si_reportes-table',
templateUrl: './si_reportes-table.html',
styleUrls: ['./si_reportes-table.scss'],
})
export class Si_reportesTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsi_reporte';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: Si_reportesService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idsi_modulo'] !== undefined) {
          const idsi_modulo = +params['idsi_modulo'];
          this.findByIdSi_modulo(idsi_modulo);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdSi_modulo(id: number): void {
      this.service
        .findByIdSi_modulo(id)
        .subscribe(
            (data: Si_reportesResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(Si_reportesAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(si_reportes: Si_reportesInterface) {
      const disposable = this.dialogService.addDialog(Si_reportesEditModalComponent, si_reportes)
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
          this.service.remove(item.idsi_reporte)
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
            (data: Si_reportesResponseInterface) =>  {
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
