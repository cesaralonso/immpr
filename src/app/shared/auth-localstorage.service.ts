
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthLocalstorage {

  constructor(private localStorageService: LocalStorageService) {
  }
  
  clearAll(): void {
      this.localStorageService.clearAll();
  }
  
  // Obtiene la hora y fecha actual
  getCurrentDateAndHour(): any {
      const date = new Date();
      const year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      month = ((+month < 10) ? '0' : '') + month;
      let day = date.getDate().toString();
      day = ((+day < 10) ? '0' : '') + day;
      let hours = date.getHours().toString();
      hours = ((+hours < 10) ? '0' : '') + hours;
      let minutes = date.getMinutes().toString();
      minutes = ((+minutes < 10) ? '0' : '') + minutes;

      const now = `${year}-${month}-${day}`;
      const hour = `${hours}:${minutes}`;

      const datehour = {
          'fecha': now,
          'hora': hour,
      };
      return datehour;
  }

}
