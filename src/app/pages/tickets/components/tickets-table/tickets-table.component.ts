import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TicketsInterface } from './tickets.interface';
import { TicketsResponseInterface } from './tickets-response.interface';
import { Component, OnInit } from '@angular/core';
import { TicketsService } from './tickets.service';
import { TicketsAddModalComponent } from './tickets-add-modal/tickets-add-modal.component';
import { TicketsEditModalComponent } from './tickets-edit-modal/tickets-edit-modal.component';
import { RegistradorasInterface } from './../../../registradoras/components/registradoras-table/registradoras.interface';
import { RegistradorasAddModalComponent } from './../../../registradoras/components/registradoras-table/registradoras-add-modal/registradoras-add-modal.component';

@Component({
selector: 'tickets-table',
templateUrl: './tickets-table.html',
styleUrls: ['./tickets-table.scss'],
})
export class TicketsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idticket';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: TicketsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertRegistradora(tickets: TicketsInterface) {
      const registradora: RegistradorasInterface = {
        ticket_idticket: tickets.idticket
      }
      const disposable = this.dialogService.addDialog(RegistradorasAddModalComponent, registradora)
      .subscribe( data => {
          if (data) {
              this.registradoraShowToast(data);
          }
      });
    }
    registradoraShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewRegistradora(tickets: TicketsInterface) {
      this.router.navigate([`/pages/registradoras/ticket/${tickets.idticket}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TicketsAddModalComponent)
      .subscribe( data => {
          if (data) {
              this.showToast(data);
          }
      });
    }
    editModalShow(tickets: TicketsInterface) {
      const disposable = this.dialogService.addDialog(TicketsEditModalComponent, tickets)
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
          this.service.remove(item.idticket)
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
      this.getAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: TicketsResponseInterface) =>  {
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
