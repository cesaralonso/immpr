import { AuthService } from './../../../../shared/auth.service';
import { OrdentareasResponseInterface } from './ordentareas-response.interface';
import { Observable } from 'rxjs/Observable';
import { OrdentareasInterface } from './ordentareas.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrdentareasService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}ordentarea`;
       }
       

       findByIdEmpleadotarea = ( id ) : Observable<OrdentareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/empleadotarea/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }


       getTiempoEstimado = ( tareatiempoinicio: any ) : Observable<OrdentareasResponseInterface> => {
           return this._http.post(`${this.endPoint}/tarea-tiempo-estimado`, tareatiempoinicio, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdTarea = ( id ) : Observable<OrdentareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/tarea/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdOrdenproducto = ( id ) : Observable<OrdentareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/ordenproducto/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<OrdentareasResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<OrdentareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( ordentarea: OrdentareasInterface ) : Observable<OrdentareasResponseInterface> => {
           return this._http.patch(this.endPoint, ordentarea, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<OrdentareasResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<OrdentareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<OrdentareasResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( ordentarea: OrdentareasInterface ) : Observable<OrdentareasResponseInterface> => {
           return this._http.post(this.endPoint, ordentarea, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
