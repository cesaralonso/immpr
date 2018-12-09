import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'emailPersonalDataFilter'
})
export class EmailPersonalFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.emailPersonal.indexOf(query) > -1);
        }
        return array;
    }
}
