import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'tipoDataFilter'
})
export class TipoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.tipo.indexOf(query) > -1);
        }
        return array;
    }
}
