/**
 * @file: Table.jsx
 * Created by wind on 17/5/20.
 * @todo: 计算天干地支的纪年。初步按照2017年，并按照60年来计算。后期会严格按照农历纪年和节气调整算法，使其与历史契合
 */

import React from 'react';

class Table extends React.Component {
  constructor() {
    super();

    this.sky = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    this.ground = ['子', '丑', '寅', '卯', '辰', '巳', '无', '为', '申', '酉', '戌', '亥'];
    this.animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    this.getCircleData = this.getCircleData.bind(this);
    this.getAllYear = this.getAllYear.bind(this);

    this.state = {
      history: [],
      begin: { year: 2017, lan: '丁酉', animal: '鸡' },
      end: { year: 1990, lan: '', animal: '' },
      skyAndGround: this.getCircleData(),
    };
  }

  getCircleData() {
    const res = [];
    const that = this;
    const { skyMax, groundMax } = { skyMax: 9, groundMax: 11 };
    let skyPos = 0;
    let groupPos = 0;
    do {
      res.push(`${that.sky[skyPos]}${that.ground[groupPos]}`);
      if (skyPos !== skyMax || groupPos !== groundMax) {
        skyPos = skyPos === skyMax ? 0 : skyPos + 1;
        groupPos = groupPos === groundMax ? 0 : groupPos + 1;
      }
    } while (skyPos !== skyMax || groupPos !== groundMax);
    // 补齐最后一个年份
    res.push('癸亥');
    return res;
  }

  getAllYear() {
    const history = [];
    const that = this;
    const { begin, end, skyAndGround } = this.state;
    const circleBegin = skyAndGround.findIndex(x => x === begin.lan);
    const animalBegin = that.animals.findIndex(x => x === begin.animal);
    for (let item = begin.year; item >= end.year; item -= 1) {
      const mid = begin.year - item;
      let itemIndex = circleBegin - parseInt(mid % 60, 10);
      let animalIndex = animalBegin - parseInt(mid % 12, 10);
      itemIndex = itemIndex < 0 ? 60 + itemIndex : itemIndex;
      animalIndex = animalIndex < 0 ? 12 + animalIndex : animalIndex;
      history.push({
        year: item,
        lan: skyAndGround[itemIndex],
        animal: that.animals[animalIndex],
      });
    }

    this.setState({
      begin,
      end,
      skyAndGround,
      history,
    });
  }

  render() {
    const { history } = this.state;
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">中国历法和西历的对应关系<button className="float-right btn btn-sm btn" onClick={this.getAllYear}>开始</button></h5>
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
