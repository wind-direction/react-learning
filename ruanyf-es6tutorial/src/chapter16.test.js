/**
 * todo: Generator 函数的语法
 * ref: http://es6.ruanyifeng.com/#docs/generator
 * command: mocha src/chapter15.test.js --compilers js:babel-core/register
 * Created by wind on 17/5/25.
 */

import { expect } from 'chai';

describe('1. 简介', () => {
  it('(1) Generator（发生器）是一个状态机，封装了多个内部状态。', () => {
    function* helloWorldGenerator() {
      yield 'hello';
      yield 'world';
      return 'ending';
    }

    let hw = helloWorldGenerator();
    expect(hw.next()).to.deep.equal({value: 'hello', done: false});
    expect(hw.next()).to.deep.equal({value: 'world', done: false});
    expect(hw.next()).to.deep.equal({value: 'ending', done: true});
    expect(hw.next()).to.deep.equal({value: undefined, done: true});
  });

  it('(2) Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。', () => {
    function* f() {
      console.log('执行了!');
    }

    let generator = f();

    setTimeout(() => generator.next(), 100);

  });

  it('(3) yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。', () => {
    let arr = [1, [[2,3], 4], [5,6]];

    let flat = function* (a) {
      for(let i = 0; i < a.length; i++) {
        let item = a[i];
        if(typeof item !== 'number'){
          yield* flat(item);
        } else {
          yield item;
        }
      }
    };

    let res = [];
    for(let f of flat(arr)) {
      res.push(f);
    }

    expect(res).to.deep.equal([1,2,3,4,5,6]);
  });

  it('(4) ')
});

describe('2. next 方法的参数', () => {});

describe('3. for...of 循环', () => {});

describe('4. Generator.prototype.throw()', () => {});

describe('5. Generator.prototype.return()', () => {});

describe('6. yield* 表达式', () => {});

describe('7. 作为对象属性的Generator函数', () => {});

describe('8. Generator 函数的this', () => {});

describe('9. 含义', () => {});

describe('10.应用', () => {});