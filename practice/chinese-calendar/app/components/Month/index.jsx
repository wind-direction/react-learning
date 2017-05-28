/**
 * @file:
 * Created by wind on 17/5/28.
 * @todo:
 */
import { getWeekBeginAndEnd } from '../Conf';
import Week from '../Week';

class Month {
  constructor(props) {
    this.year = props.year;
    this.month = props.month;
    this.begin = props.begin;
    this.end = props.end;
    this.getData = this.getData.bind(this);
  }

  getData() {
    const { year, month } = this;
    const res = [];
    let item = this.begin;
    do {
      // 获取这一天所在的周
      const weekInfo = getWeekBeginAndEnd(item);
      if (weekInfo.begin < this.begin) {
        weekInfo.begin = this.begin;
      }

      if (weekInfo.end > this.end) {
        weekInfo.end = this.end;
      }
      const args = Object.assign(weekInfo, { year, month });
      const weekInstance = new Week(args);
      res.push(weekInstance.getData());
      item = new Date(weekInfo.end.getTime() + 86400000);
    } while (item <= this.end) ;
    return res;
  }
}

export default Month;
