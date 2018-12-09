import { CortesService } from './../../../pages/cortes/components/cortes-table/cortes.service';
import { CortesInterface } from './../../../pages/cortes/components/cortes-table/cortes.interface';
import { CortesEditModalComponent } from './../../../pages/cortes/components/cortes-table/cortes-edit-modal/cortes-edit-modal.component';
import { CortesAddModalComponent } from './../../../pages/cortes/components/cortes-table/cortes-add-modal/cortes-add-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/auth.service';
import { Component } from '@angular/core';
import { GlobalState } from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  isScrolled: boolean = false;
  isMenuCollapsed: boolean = false;
  isAuth: boolean;
  openCaja: boolean;
  closeCaja: boolean;
  user;
  corte: CortesInterface;

  constructor(
    private _state: GlobalState, 
    private dialogService: DialogService, 
    private authService: AuthService,
    private cortesService: CortesService,
    private toastrService: ToastrService,
    private router: Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.isAuth = this.authService.isLoggedIn;
    if (this.isAuth) {
      this.user = this.authService.useJwtHelper();
      if (this.user.area === 'Caja') {
        this.getCorte();
      }
    }
  }

  getCorte() {
        // es rol caja
        this.cortesService.findInThisDay()
          .subscribe((data: any) => {

            if (data.success) {
              if (data.result[0]) {
                this.corte = data.result[0];
                this.closeCaja = true;
                this.openCaja = false;
              } else {
                this.openCaja = true;
                this.closeCaja = false;
              }
            }

          });
  }

  buscarOrden(idorden: number) {
      this.router.navigate([`/pages/ordens/${idorden}`]);
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  logout() {
    this.authService.logout();
  }

  showToast(result) {
    if (result.success) {
      this.toastrService.success(result.message);
    } else {
      this.toastrService.error(result.message);
    }
  }

  CorteAddModalShow() {
    const disposable = this.dialogService.addDialog(CortesAddModalComponent)
    .subscribe( data => {
        if (data) {
            this.showToast(data);
            this.getCorte();
        }
    });
  }
  
  CorteEditModalShow() {
    const disposable = this.dialogService.addDialog(CortesEditModalComponent, this.corte)
    .subscribe( data => {
        if (data) {
            this.showToast(data);
            this.getCorte();
        }
    },
    error => console.log(error),
    () => console.log('Modified complete'));
  }

}
