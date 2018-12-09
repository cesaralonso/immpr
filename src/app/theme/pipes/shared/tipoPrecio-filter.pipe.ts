import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'tipoPrecioDataFilter'
})
export class TipoPrecioFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.tipoprecio_tipoprecio_idtipoprecio.indexOf(query) > -1);
        }
        return array;
    }
}
