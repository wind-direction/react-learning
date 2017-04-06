import React from 'react';
import { expect } from 'chai';
import List from '../components/List';
import ListItem from '../components/ListItem';
import ItemShowLayer from '../components/ItemShowLayer';
import { shallow } from 'enzyme';

describe("使用enzyme测试组件", () => {
  // 添加一些数据
  const testData = [
    {
      "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
      "title": "Hello",
      "content": "##### testing markdown",
      "time": 1458030208359
    },
    {
      "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775b",
      "title": "Hello2",
      "content": "##### hello world",
      "time": 1458030208359
    }
  ];

  // 第一个测试用例
  it('测试 List 组件', () => {
    let list = shallow(<List items={testData} />);
    //直接查找用testData渲染后应该有的ListItem的数量， 结果应该和testData的长度保持一致
    expect(list.find(ListItem).length).to.equal(testData.length);
  });

  // 测试ListItem组件
  it("测试 ListItem 组件", () => {
    let listItem = shallow(<ListItem item={testData[0]} />);
    // 判断.item-title的值是否与传入的一致
    expect(listItem.find('.item-title').text()).to.equal(testData[0].title);
    // 测试该组件是否包含样式类list-group-item
    expect(listItem.hasClass('list-group-item')).to.equal(true);
  });

  // 测试 ItemShowLayer 组件
  it('测试 ItemShowLayer 组件, 没有传入item的情况', () => {
    // 传入空对象
    let item = {};
    let itemShowLayer = shallow(<ItemShowLayer item={item} />);
    expect(itemShowLayer.find('.no-select').length).to.equal(1);
    expect(itemShowLayer.hasClass('item-show-layer-component')).to.equal(true);
  });

  // 测试 ItemShowLayer 组件
  it('测试 ItemShowLayer 组件, 传入了item的情况', () => {
    // 传入空对象
    let itemShowLayer = shallow(<ItemShowLayer item={testData[0]} />);
    expect(itemShowLayer.find('h2').text()).to.equal(testData[0].title);
    expect(itemShowLayer.hasClass('item-show-layer-component')).to.equal(true);
  });
});