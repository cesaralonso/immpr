import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'modulo_Modulo_idsi_moduloDataFilter'
})
export class Modulo_Modulo_idsi_moduloFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.si_modulo_Modulo_idsi_modulo.indexOf(query) > -1);
        }
        return array;
    }
}
