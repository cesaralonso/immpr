import { AuthService } from './../../../../shared/auth.service';
import { EmpleadotareaestadosResponseInterface } from './empleadotareaestados-response.interface';
import { Observable } from 'rxjs/Observable';
import { EmpleadotareaestadosInterface } from './empleadotareaestados.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmpleadotareaestadosService {
    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    private endPoint: string;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private authService: AuthService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.headers.append('Authorization', 'JWT ' + this.authService.token);
        this.options = new RequestOptions({ headers: this.headers });
        this.endPoint = `${this._configuration.ServerWithApiUrl}empleadotareaestado`;
       }
       findByIdEmpleadotarea = ( id ) : Observable<EmpleadotareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/empleadotarea/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdEstadoscrum = ( id ) : Observable<EmpleadotareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/estadoscrum/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<EmpleadotareaestadosResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<EmpleadotareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( empleadotareaestado: EmpleadotareaestadosInterface ) : Observable<EmpleadotareaestadosResponseInterface> => {
           return this._http.patch(this.endPoint, empleadotareaestado, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<EmpleadotareaestadosResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<EmpleadotareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<EmpleadotareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( empleadotareaestado: EmpleadotareaestadosInterface ) : Observable<EmpleadotareaestadosResponseInterface> => {
           return this._http.post(this.endPoint, empleadotareaestado, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
