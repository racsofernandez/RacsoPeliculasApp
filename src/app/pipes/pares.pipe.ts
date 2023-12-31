import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {

  transform( arr: any[] ): any[] {

    // console.log("Array", arr);
    const pares = arr.reduce( (result, value, index, array) => {

      if ( index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);

    // console.log("Pares", pares);
    return pares;
 }

}
