/**
 * 天组件
 */
class Day {
  constructor(props) {
    this.day = props.day;
    this.year = props.year;
    this.month = props.month;
    this.getData = this.getData.bind(this);
  }

  getData() {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
    };
  }
}

export default Day;
