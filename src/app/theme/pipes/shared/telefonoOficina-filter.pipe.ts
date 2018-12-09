import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'telefonoOficinaDataFilter'
})
export class TelefonoOficinaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.telefonoOficina.indexOf(query) > -1);
        }
        return array;
    }
}
