import React from 'react';
import { expect } from 'chai';
import DeskMark from '../components/DeskMark';
import { mount } from 'enzyme';

describe('测试 DeskMark 组件', () => {

  it('首次加载: editor 组件应该出现, showLayer组件应该消失，同时左侧列表条目为空', () => {
    let deskMark = mount(<DeskMark />);
    // 单机按钮
    deskMark.find('.create-bar-component').simulate('click');
    // editor 组件应该出现, showLayer组件应该消失，同时左侧列表条目为空
    expect(deskMark.find('.item-editor-component').length).to.equal(1);
    expect(deskMark.find('.item-show-layer-component').length).to.equal(0);
    expect(deskMark.find('.item-component').length).to.equal(0);
  });

  it('填充数据点击保存：showLayer组件应该出现,editor组件应该消失, 同时左侧列表条目应该为1', () => {
    let deskMark = mount(<DeskMark />);
    // 单击按钮
    deskMark.find('.create-bar-component').simulate('click');
    //出来之后
    let input = deskMark.find('input');
    input.node.value = '新的测试标题';
    input.simulate('change', input);
    // 填充内容
    let textarea = deskMark.find('textarea');
    textarea.node.value = '#### 这是测试的内容';
    textarea.simulate('change', textarea);
    // 点击按钮
    deskMark.find('.btn-success').simulate('click');
    //showLayer组件应该出现,editor组件应该消失, 同时左侧列表条目应该为1
    expect(deskMark.find('.item-editor-component').length).to.equal(0);
    expect(deskMark.find('.item-show-layer-component').length).to.equal(1);
    expect(deskMark.find('.item-component').length).to.equal(1);
    //itemList 的第一个条目应该和填写的标题相同
    expect(deskMark.find('.item-component').first().find('.item-title').text()).to.equal('新的测试标题');
  });

});

