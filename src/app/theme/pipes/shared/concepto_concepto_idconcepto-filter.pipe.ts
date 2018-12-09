import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'concepto_concepto_idconceptoDataFilter'
})
export class Concepto_concepto_idconceptoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.concepto_concepto_idconcepto.indexOf(query) > -1);
        }
        return array;
    }
}
