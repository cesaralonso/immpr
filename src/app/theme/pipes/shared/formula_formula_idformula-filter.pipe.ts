import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'formula_formula_idformulaDataFilter'
})
export class Formula_formula_idformulaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.formula_formula_idformula.indexOf(query) > -1);
        }
        return array;
    }
}
