import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'cliente_cliente_idclienteDataFilter'
})
export class Cliente_cliente_idclienteFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.cliente_cliente_idcliente.indexOf(query) > -1);
        }
        return array;
    }
}
