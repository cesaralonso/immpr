import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'telefonoCasaDataFilter'
})
export class TelefonoCasaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.telefonoCasa.indexOf(query) > -1);
        }
        return array;
    }
}
