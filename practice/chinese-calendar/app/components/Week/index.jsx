import Day from '../Day';

class Week {
  constructor(props) {
    this.year = props.year;
    this.month = props.month;
    this.begin = props.begin;
    this.end = props.end;
    this.getData = this.getData.bind(this);
  }

  getData() {
    const res = [];
    const { year, month } = this;
    let item = this.begin;
    do {
      const dayInstance = new Day({ day: item, year, month });
      res.push(dayInstance.getData());
      item = new Date(item.getTime() + 86400000);
    } while (item <= this.end) ;

    return res;
  }
}

export default Week;
