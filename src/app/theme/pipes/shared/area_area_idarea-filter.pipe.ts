import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'area_area_idareaDataFilter'
})
export class Area_area_idareaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.area_area_idarea.indexOf(query) > -1);
        }
        return array;
    }
}
