import { AuthService } from './../../../../shared/auth.service';
import { OrdensResponseInterface } from './ordens-response.interface';
import { Observable } from 'rxjs/Observable';
import { OrdensInterface } from './ordens.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrdensService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}orden`;
       }

        allFromTo = ( fechaDesde: string, fechaHasta: string ) : Observable<OrdensResponseInterface> => {
           return this._http.get(`${this.endPoint}/from-to/${fechaDesde}/${fechaHasta}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
        }
        entregarOrden = ( orden: OrdensInterface ) : Observable<OrdensResponseInterface> => {
           return this._http.patch(`${this.endPoint}/entrega/`, orden, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
        }
        finalizarOrden = ( orden: OrdensInterface ) : Observable<OrdensResponseInterface> => {
           return this._http.patch(`${this.endPoint}/finaliza/`, orden, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
        }
       updateMontos = ( idorden: number ) : Observable<OrdensResponseInterface> => {
           return this._http.get(`${this.endPoint}/montos/${idorden}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdCliente = ( id ) : Observable<OrdensResponseInterface> => {
           return this._http.get(`${this.endPoint}/cliente/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<OrdensResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<OrdensResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( orden: OrdensInterface ) : Observable<OrdensResponseInterface> => {
           return this._http.patch(this.endPoint, orden, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<OrdensResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<OrdensResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<OrdensResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( orden: OrdensInterface ) : Observable<OrdensResponseInterface> => {
           return this._http.post(this.endPoint, orden, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
