import { Component, OnInit } from '@angular/core';

import { FeedEmpleadosService } from './feed-empleados.service';

@Component({
  selector: 'feed-empleados',
  templateUrl: './feed-empleados.html',
  styleUrls: ['./feed-empleados.scss']
})
export class FeedEmpleados implements OnInit {

  maseficientes: Array<Object>;
  menoseficientes: Array<Object>;

  constructor(private _feedService: FeedEmpleadosService) {
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage (message) {
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this._feedService.all()
      .subscribe(result => {

          console.log("result", result);
          this.maseficientes = result.result.maseficientes;
          this.menoseficientes = result.result.menoseficientes;

      } );
  }
}
