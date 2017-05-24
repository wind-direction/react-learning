/**
 * @file:
 * Created by wind on 17/5/24.
 * @todo:
 */
import PropType from 'prop-types';
import { ANM, GRD, SKY, MID } from '../Conf';

const propType = {
  day: PropType.object.isRequired
};

class Year {
  constructor(props) {
    this.begin = props.day;
  }
}

Year.prototype = propType;

export default Year;