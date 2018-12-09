import { AuthService } from './../../../../shared/auth.service';
import { EmpleadosResponseInterface } from './empleados-response.interface';
import { Observable } from 'rxjs/Observable';
import { EmpleadosInterface } from './empleados.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmpleadosService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}empleado`;
       }
       findByIdArea = ( id ) : Observable<EmpleadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/area/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdPersona = ( id ) : Observable<EmpleadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/persona/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdSi_user = ( id ) : Observable<EmpleadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/si_user/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       allByAreaWithIdOrdenTarea = (idordentarea) : Observable<EmpleadosResponseInterface> => {
           if (!idordentarea) {
                return this._http.get(this.endPoint, this.options)
                    .map((response: Response) => response.json())
                    .catch(this.handleError);
           } else {
                return this._http.get(`${this.endPoint}/ordentarea/${idordentarea}`, this.options)
                    .map((response: Response) => response.json())
                    .catch(this.handleError);
           }
       }
       all = () : Observable<EmpleadosResponseInterface> => {
            return this._http.get(this.endPoint, this.options)
                .map((response: Response) => response.json())
                .catch(this.handleError);
       }
       findById = ( id ) : Observable<EmpleadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( empleado: EmpleadosInterface ) : Observable<EmpleadosResponseInterface> => {
           return this._http.patch(this.endPoint, empleado, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<EmpleadosResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<EmpleadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<EmpleadosResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( empleado: EmpleadosInterface ) : Observable<EmpleadosResponseInterface> => {
           return this._http.post(this.endPoint, empleado, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
