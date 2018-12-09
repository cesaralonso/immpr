import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'tipoalerta_tipoalerta_idtipoalertaDataFilter'
})
export class Tipoalerta_tipoalerta_idtipoalertaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.tipoalerta_tipoalerta_idtipoalerta.indexOf(query) > -1);
        }
        return array;
    }
}
