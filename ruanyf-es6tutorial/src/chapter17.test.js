/**
 * todo: Generator 函数的异步应用
 * ref: http://es6.ruanyifeng.com/#docs/generator-async
 * command: mocha src/chapter17.test.js --compilers js:babel-core/register
 * Created by wind on 17/5/26.
 */

import { expect } from 'chai';
import fetch from 'node-fetch';

describe('1. 传统方法', () => {});
describe('2. 基本概念', () => {});
describe('3. Generator 函数', () => {
  it('(1) 异步任务的封装 (此用例需要在浏览器中模拟，否则等不到异步输出)', () => {
    function* gen() {
      let url = 'https://api.github.com/users/github';
      let result = yield fetch(url);
      console.log('d', result);
    }

    let g = gen();
    g.next().value
      .then( data => {
        console.log('a');
        return data.json();
      })
      .then( data => {
        console.log('b');
        return g.next(data);
      })
      .catch( err => {
        console.log('c');
        console.log(err)
      })
  });
});
describe('4. Thunk 函数', () => {});
describe('5. co 模块', () => {});
