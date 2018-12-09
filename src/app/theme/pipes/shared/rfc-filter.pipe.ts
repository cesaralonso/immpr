import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'rfcDataFilter'
})
export class RfcFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.rfc.indexOf(query) > -1);
        }
        return array;
    }
}
