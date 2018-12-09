import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'ordenproducto_ordenproducto_idordenproductoDataFilter'
})
export class Ordenproducto_ordenproducto_idordenproductoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.ordenproducto_ordenproducto_idordenproducto.indexOf(query) > -1);
        }
        return array;
    }
}
