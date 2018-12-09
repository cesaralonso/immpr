import { AuthService } from './../../../../shared/auth.service';
import { PrinterService } from './../../../../shared/printer.service';
import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { AbonosInterface } from './abonos.interface';
import { AbonosResponseInterface } from './abonos-response.interface';
import { Component, OnInit } from '@angular/core';
import { AbonosService } from './abonos.service';
import { AbonosAddModalComponent } from './abonos-add-modal/abonos-add-modal.component';
import { AbonosEditModalComponent } from './abonos-edit-modal/abonos-edit-modal.component';


@Component({
selector: 'abonos-table',
templateUrl: './abonos-table.html',
styleUrls: ['./abonos-table.scss'],
})
export class AbonosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idabono';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: AbonosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private printerService: PrinterService,
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
            if (userModules[element].path === '/pages/abonos') {
              this.updateable = userModules[element].updateable;
              this.deleteable = userModules[element].deleteable;
              this.writeable = userModules[element].writeable;
            }
          }
        }
      }
    }
    
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idorden'] !== undefined) {
          const idorden = +params['idorden'];
          this.findByIdOrden(idorden);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdOrden(id: number): void {
      this.service
        .findByIdOrden(id)
        .subscribe(
            (data: AbonosResponseInterface) => {
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

    printAbono(abonos: AbonosInterface) {
      
      const html = this.printerService.printAbono(abonos);
        
      const ventimp = window.open(' ', 'Abono a Orden');
      ventimp.document.write(html);
      ventimp.document.close();
      ventimp.print();
      ventimp.close();
    }

    addModalShow() {
      const disposable = this.dialogService.addDialog(AbonosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(abonos: AbonosInterface) {
      const disposable = this.dialogService.addDialog(AbonosEditModalComponent, abonos)
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
          this.service.remove(item.idabono)
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
            (data: AbonosResponseInterface) =>  {
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
