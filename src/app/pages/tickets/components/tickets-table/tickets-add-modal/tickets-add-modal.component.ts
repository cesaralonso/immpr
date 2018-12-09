import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TicketsService } from './../tickets.service';
import { TicketsInterface } from './../tickets.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./tickets-add-modal.component.scss')],
  templateUrl: './tickets-add-modal.component.html'
})
export class TicketsAddModalComponent extends DialogComponent<TicketsInterface, any> implements OnInit, TicketsInterface {

  html: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  htmlAC: AbstractControl;

  constructor(
    private service: TicketsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'htmlAC' : ['', Validators.compose([ Validators.required, Validators.maxLength(545)])],
    });
    this.htmlAC = this.form.controls['htmlAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: TicketsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  html: this.html,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
