import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): any {
    if (value) {
      let time = moment.duration(value, 'seconds')
      let hour = time.hours() ? String(time.hours()) : '';
      let minute = this.doArrange(time.minutes(), hour);
      let second = this.doArrange(time.seconds());
      console.log(hour)
      console.log(minute)
      console.log(second)
      return `${hour ? hour + ':' : hour}${minute + ':'}${second}`
    } else {
      return '--:--'
    }
  }

  doArrange(value: number, isHaveHour?: string){
    let res = '';
    // 檢查有沒有值
    if(value){
      // 如果有小時 就要多補一個零
      if(isHaveHour !== ''){
        res = String(value).length < 2 ? '0' + value : String(value)
      } else {
        // 沒有的話就不補零
        res = String(value)
      }
    } else {
      // 沒有直接補零
      res = '00'
    }
    return res;
  }

}
