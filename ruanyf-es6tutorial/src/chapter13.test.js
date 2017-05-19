/**
 * todo: Reflect
 * ref: http://es6.ruanyifeng.com/#docs/reflect
 * Created by wind on 17/5/19.
 * command: mocha src/chapter13.test.js --compilers js:babel-core/register
 */

import { expect } from 'chai';

describe('1. 概述', () => {
  it('(1) 让Object操作都变成函数行为', () => {
    expect('assign' in Object).to.equal(true);
    expect(Reflect.has(Object, 'assign')).to.equal(true);
  });
});
describe('2. 静态方法', () => {});
describe('3. 实例：使用Proxy实现观察者模式', () => {});


