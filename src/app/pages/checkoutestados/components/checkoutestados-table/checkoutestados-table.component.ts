import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CheckoutestadosInterface } from './checkoutestados.interface';
import { CheckoutestadosResponseInterface } from './checkoutestados-response.interface';
import { Component, OnInit } from '@angular/core';
import { CheckoutestadosService } from './checkoutestados.service';
import { CheckoutestadosAddModalComponent } from './checkoutestados-add-modal/checkoutestados-add-modal.component';
import { CheckoutestadosEditModalComponent } from './checkoutestados-edit-modal/checkoutestados-edit-modal.component';
import { CheckoutsInterface } from './../../../checkouts/components/checkouts-table/checkouts.interface';
import { CheckoutsAddModalComponent } from './../../../checkouts/components/checkouts-table/checkouts-add-modal/checkouts-add-modal.component';

@Component({
selector: 'checkoutestados-table',
templateUrl: './checkoutestados-table.html',
styleUrls: ['./checkoutestados-table.scss'],
})
export class CheckoutestadosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcheckoutestado';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: CheckoutestadosService, 
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
            if (userModules[element].path === '/pages/checkoutestados') {
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
    insertCheckout(checkoutestados: CheckoutestadosInterface) {
      const checkout: CheckoutsInterface = {
        checkoutestado_idcheckoutestado: checkoutestados.idcheckoutestado
      }
      const disposable = this.dialogService.addDialog(CheckoutsAddModalComponent, checkout)
      .subscribe( data => {
          if (data) {
          this.checkoutShowToast(data);
          }
      });
    }
    checkoutShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewCheckout(checkoutestados: CheckoutestadosInterface) {
      this.router.navigate([`/pages/checkouts/checkoutestado/${checkoutestados.idcheckoutestado}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(CheckoutestadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(checkoutestados: CheckoutestadosInterface) {
      const disposable = this.dialogService.addDialog(CheckoutestadosEditModalComponent, checkoutestados)
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
          this.service.remove(item.idcheckoutestado)
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
            (data: CheckoutestadosResponseInterface) =>  {
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
