import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'fechaEntregaEstimadaDataFilter'
})
export class FechaEntregaEstimadaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.fechaEntregaEstimada.indexOf(query) > -1);
        }
        return array;
    }
}
