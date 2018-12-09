import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'ordentarea_ordentarea_idordentareaDataFilter'
})
export class Ordentarea_ordentarea_idordentareaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.ordentarea_ordentarea_idordentarea.indexOf(query) > -1);
        }
        return array;
    }
}
