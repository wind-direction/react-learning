/**
 * 天组件
 */
import PropTypes from 'prop-type';
import { GRD } from '../Conf';

const propTypes = {
  day: PropTypes.object.isRequired
};

class Day {
  constructor(props) {
    this.Time = new Date(props.day);
    this.split = this.split.bind(this);
    this.info = this.split();
  }

  split() {
    return GRD.map((str, index) => {
      return {
        name: `${str}时`,
        range: {
          begin: `${index*2}:00:00`,
          end: `${index*2+1}:59:59`
        }
      }
    });
  }
}

Day.prototype = propTypes;

export default Day;