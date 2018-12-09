import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'producto_producto_idproductoDataFilter'
})
export class Producto_producto_idproductoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.producto_producto_idproducto.indexOf(query) > -1);
        }
        return array;
    }
}
