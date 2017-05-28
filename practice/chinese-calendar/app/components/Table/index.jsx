/**
 * @file: Table.jsx
 * Created by wind on 17/5/20.
 * @todo: 计算天干地支的纪年。初步按照2017年，并按照60年来计算。后期会严格按照农历纪年和节气调整算法，使其与历史契合
 * 初步算法：按照天来计算
 * |- 公历年月，注意闰年
 * |- 阴历年月，注意闰月（十九年七闰，另外需要标注节气）
 */

import React from 'react';
import YearClass from '../YearClass';
import { BASE_DAY } from '../Conf';

class Table extends React.Component {
  constructor() {
    super();
    this.getAllYear = this.getAllYear.bind(this);
    this.getHtml = this.getHtml.bind(this);
    this.history = [];
    this.state = { begin: BASE_DAY };
  }

  getAllYear() {
    const begin = this.state.begin;
    const history = [];
    const year = begin.time.getFullYear();
    for (let item = year; item >= 2005; item -= 1) {
      const args = {
        year: item,
        begin: new Date(`${item}/01/01 00:00:00`),
        end: new Date(Date.parse(`${item + 1}/01/01 00:00:00`) - 1000),
      };
      const yearInstance = new YearClass(args);
      history.push(yearInstance.getData());
    }
    this.history = history;

    const html = this.getHtml();

    this.setState({ html });
  }

  getHtml() {
    const res = [];
    this.history.forEach(
      year => year.forEach(
        month => month.forEach(
          week => week.forEach(
            item => res.push(
              (<tr>
                <td>{item.year}</td>
                <td>{item.month}</td>
                <td>{item.day.toString()}</td>
              </tr>),
            ),
          ),
        ),
      ),
    );

    return res;
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">
                中国历法和西历的对应关系
                <button className="float-right btn btn-sm btn" onClick={this.getAllYear}>开始</button>
              </h5>
            </div>
            <div className="card-block">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover table-sm">
                  <thead>
                    <tr>
                      <th>年</th>
                      <th>月</th>
                      <th>日</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.html}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
