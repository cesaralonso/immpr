import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ConceptosInterface } from './conceptos.interface';
import { ConceptosResponseInterface } from './conceptos-response.interface';
import { Component, OnInit } from '@angular/core';
import { ConceptosService } from './conceptos.service';
import { ConceptosAddModalComponent } from './conceptos-add-modal/conceptos-add-modal.component';
import { ConceptosEditModalComponent } from './conceptos-edit-modal/conceptos-edit-modal.component';
import { EgresoconceptosInterface } from './../../../egresoconceptos/components/egresoconceptos-table/egresoconceptos.interface';
import { EgresoconceptosAddModalComponent } from './../../../egresoconceptos/components/egresoconceptos-table/egresoconceptos-add-modal/egresoconceptos-add-modal.component';

@Component({
selector: 'conceptos-table',
templateUrl: './conceptos-table.html',
styleUrls: ['./conceptos-table.scss'],
})
export class ConceptosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idconcepto';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: ConceptosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private authService: AuthService, 
      private route: ActivatedRoute, 
      private router: Router) {

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
            if (userModules[element].path === '/pages/conceptos') {
              this.updateable = userModules[element].updateable;
              this.deleteable = userModules[element].deleteable;
              this.writeable = userModules[element].writeable;
            }
          }
        }
      }
    }
    ngOnInit() {
      this.getAll();
    }
    insertEgresoconcepto(conceptos: ConceptosInterface) {
      const egresoconcepto: EgresoconceptosInterface = {
        concepto_idconcepto: conceptos.idconcepto
      }
      const disposable = this.dialogService.addDialog(EgresoconceptosAddModalComponent, egresoconcepto)
      .subscribe( data => {
          if (data) {
          this.egresoconceptoShowToast(data);
          }
      });
    }
    egresoconceptoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewEgresoconcepto(conceptos: ConceptosInterface) {
      this.router.navigate([`/pages/egresoconceptos/concepto/${conceptos.idconcepto}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ConceptosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(conceptos: ConceptosInterface) {
      const disposable = this.dialogService.addDialog(ConceptosEditModalComponent, conceptos)
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
          this.service.remove(item.idconcepto)
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
            (data: ConceptosResponseInterface) =>  {
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
