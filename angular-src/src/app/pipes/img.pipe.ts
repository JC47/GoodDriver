import { Pipe, PipeTransform } from '@angular/core';
import { ApiUrl } from '../../environments/environment';

@Pipe({
    name: 'img'
})
export class ImgPipe implements PipeTransform {

    constructor() { }

    transform(value: string): string {
        return `${ApiUrl}${value}`;
    }
}