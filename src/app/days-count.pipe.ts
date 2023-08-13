import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'daysCount'
})
export class DaysCountPipe implements PipeTransform {

  transform(installationDate: any): string {
    // replace this with correct return value as per requirement mentioned in QP
    let today = new Date()
    installationDate  = new Date(installationDate)
    let differenceInTime = installationDate.getTime()-today.getTime()
    let differenceInDays = Math.ceil(differenceInTime/(1000*3600*24))

    return `${differenceInDays}`;
  }

}
