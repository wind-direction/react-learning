/**
 * @file:
 * Created by wind on 17/5/24.
 * @todo:
 */
import { getMonthBeginAndEnd } from '../Conf';
import Month from '../Month';

class YearClass {
  constructor(props) {
    this.year = props.year;
    this.begin = props.begin;
    this.end = props.end;
    this.getData = this.getData.bind(this);
  }

  getData() {
    const beginMonth = this.begin.getMonth();
    const endMonth = this.end.getMonth();
    const baseYear = this.year;
    const res = [];
    for (let item = beginMonth; item <= endMonth; item += 1) {
      const info = getMonthBeginAndEnd(new Date(`${baseYear}/${item + 1}/01 00:00:00`));
      const args = Object.assign(info, { month: item, year: baseYear });
      const monthInstance = new Month(args);
      res.push(monthInstance.getData());
    }
    res.reverse();
    return res;
  }
}

export default YearClass;
