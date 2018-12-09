import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'formulaDataFilter'
})
export class FormulaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.formula.indexOf(query) > -1);
        }
        return array;
    }
}
