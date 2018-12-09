import { AuthService } from './../../../../shared/auth.service';
import { OrdenproductosResponseInterface } from './ordenproductos-response.interface';
import { Observable } from 'rxjs/Observable';
import { OrdenproductosInterface } from './ordenproductos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrdenproductosService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}ordenproducto`;
       }

       calcularPrecio = (calculo: any) : Observable<OrdenproductosResponseInterface> => {
           return this._http.post(`${this.endPoint}/calcular-precio`, calculo, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdOrden = ( id ) : Observable<OrdenproductosResponseInterface> => {
           return this._http.get(`${this.endPoint}/orden/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdProducto = ( id ) : Observable<OrdenproductosResponseInterface> => {
           return this._http.get(`${this.endPoint}/producto/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdTipoprecio = ( id ) : Observable<OrdenproductosResponseInterface> => {
           return this._http.get(`${this.endPoint}/tipoprecio/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<OrdenproductosResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<OrdenproductosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( ordenproducto: OrdenproductosInterface ) : Observable<OrdenproductosResponseInterface> => {
           return this._http.patch(this.endPoint, ordenproducto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<OrdenproductosResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<OrdenproductosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<OrdenproductosResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( ordenproducto: OrdenproductosInterface ) : Observable<OrdenproductosResponseInterface> => {
           return this._http.post(this.endPoint, ordenproducto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
