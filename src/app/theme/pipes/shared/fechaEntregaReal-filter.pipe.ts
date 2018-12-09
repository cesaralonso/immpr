import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'fechaEntregaRealDataFilter'
})
export class FechaEntregaRealFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.fechaEntregaReal.indexOf(query) > -1);
        }
        return array;
    }
}
