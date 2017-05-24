/**
 * @file: Table.jsx
 * Created by wind on 17/5/20.
 * @todo: 计算天干地支的纪年。初步按照2017年，并按照60年来计算。后期会严格按照农历纪年和节气调整算法，使其与历史契合
 * 初步算法：按照天来计算
 * |- 公历年月，注意闰年
 * |- 阴历年月，注意闰月（十九年七闰，另外需要标注节气）
 */

import React from 'react';
import Year from '../Year';

class Table extends React.Component {
  constructor() {
    super();
    const begin = {
      time: new Date('2017/01/28'),
      year: '丁酉',
      month: '辛丑',
      day: '乙卯',
      animal: '鸡',
      desc: '正月初一',
    };
    this.getAllYear = this.getAllYear.bind(this);
    this.state = { begin, history: [] };
  }

  getAllYear() {
    const { begin, history } = this.state;
    const year = begin.time.getFullYear();
    for(let item = year; item >= 2000; item--) {
      let yearInstance = new Year(new Date(`${item}/01/01 00:00:00`));
      history.push(yearInstance.getData());
    }

    this.setState({ history });
  }

  render() {
    const { history } = this.state;
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
                      <th>公元</th>
                      <th>天干地支</th>
                      <th>生肖</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map(
                      item => (
                        <tr>
                          <td>{item.year}</td>
                          <td>{item.lan}</td>
                          <td>{item.animal}</td>
                        </tr>
                      ),
                    )}
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
