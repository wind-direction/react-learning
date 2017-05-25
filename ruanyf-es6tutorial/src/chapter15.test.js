/**
 * todo: Iterator和for...of循环
 * ref: http://es6.ruanyifeng.com/#docs/iterator
 * command: mocha src/chapter15.test.js --compilers js:babel-core/register
 * Created by wind on 17/5/25.
 */
import { expect } from 'chai';


describe('1. Iterator（遍历器）的概念', () => {
  it('(1) 一个模拟next方法返回值的例子。', () => {
    function makeIterator(array){
      let nextIndex = 0;
      return {
        next() {
          return nextIndex < array.length ?
            {value: array[nextIndex++], done: false} :
            {value: undefined, done: true}
        }
      };
    }

    let it = makeIterator(['a', 'b']);
    expect(it.next()).to.deep.equal({value: "a", done: false});
    expect(it.next()).to.deep.equal({value: "b", done: false});
    expect(it.next()).to.deep.equal({value: undefined, done: true});
  });

  it('(2) 由于Iterator只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的', () => {
    function idMaker() {
      let index = 0;
      return {
        next() {
          return {value: index++, done: false}
        }
      }
    }

    let it = idMaker();
    expect(it.next().value).to.equal(0);
    expect(it.next().value).to.equal(1);
    expect(it.next().value).to.equal(2);
    expect(it.next().value).to.equal(3);
  });
});

describe('2. 数据结构的默认Iterator接口', () => {
  it('(1) 一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。', () => {
    const obj = {
      [Symbol.iterator]() {
        return {
          next() {
            return {value: 1, done: true}
          }
        }
      }
    };

    let it = obj[Symbol.iterator]();
    expect(it.next()).to.deep.equal({value: 1, done: true});
    expect(it.next()).to.deep.equal({value: 1, done: true});
  });

  it('(2) 一个对象如果要有可被for...of循环调用的Iterator接口，就必须在Symbol.iterator的属性上部署遍历器生成方法', () => {
    class RangeIterator {
      constructor(start, stop) {
        this.value = start;
        this.stop = stop;
      }

      [Symbol.iterator]() { return this; }

      next() {
        let value = this.value;
        if(value < this.stop) {
          this.value++;
          return {done: false, value: value};
        }
        return {done: true, value: undefined};
      }
    }

    function range(start, stop) {
      return new RangeIterator(start, stop);
    }

    let index = 0;
    for(let value of range(0, 3)) {
      expect(value).to.equal(index);
      index++;
    }
  });

  it('(3) 通过遍历器实现指针结构的例子。', () => {
    function Obj(value){
      this.value = value;
      this.next = null;
    }

    Obj.prototype[Symbol.iterator] = function() {
      let current = this;
      return {
        next() {
          if(current) {
            let value = current.value;
            current = current.next;
            return { done: false, value };
          } else {
            return { done: true }
          }
        }
      };
    };

    let one = new Obj(1);
    let two = new Obj(2);
    let three = new Obj(3);

    one.next = two;
    two.next = three;

    let index = 1;
    for( let i of one) {
      expect(i).to.equal(index);
      index ++;
    }
  });

  it('(4) 为对象添加Iterator接口的例子。', () => {
    let obj = {
      data: ['hello', 'world'],
      [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
          next() {
            if(index < self.data.length) {
              return {
                value: self.data[index++],
                done: false
              };
            }else {
              return { value: undefined, done: true}
            }
          }
        };
      }
    };

    let it = obj[Symbol.iterator]();
    expect(it.next().value).to.equal('hello');
    expect(it.next().value).to.equal('world');
  });

  it('(5) 对于类似数组的对象（存在数值键名和length属性），部署Iterator接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的Iterator接口。', () => {
    let iterable = {
      0: 'a',
      1: 'b',
      2: 'c',
      length: 3,
      [Symbol.iterator]: Array.prototype[Symbol.iterator]
    };

    expect([...iterable]).to.deep.equal(['a','b','c']);
    let index = 0;
    for(let item of iterable){
      expect(item).to.equal(iterable[index]);
      index ++;
    }
  });

  it('(6) 普通对象（无数值键名）部署数组的Symbol.iterator方法，并无效果。', () => {
    let iterable = {
      a: 'a',
      b: 'b',
      c: 'c',
      length: 3,
      [Symbol.iterator]: Array.prototype[Symbol.iterator]
    };

    expect([...iterable]).to.deep.equal([undefined,undefined,undefined]);
  });

  it('(7) 如果Symbol.iterator方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。', () => {
    let obj = {};
    obj[Symbol.iterator] = () => 1;
    try {
      [...obj];
    }catch (e) {
      expect(e.name).to.equal('TypeError');
      expect(e.message).to.equal('1 is not an iterator');
    }
  });
});

describe('3. 调用Iterator接口的场合', () => {
  it('(1) 解构赋值,对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法。', () => {
    let set  = new Set().add('a').add('b').add('c');
    let [x, y] = set;
    expect(x).to.equal('a');
    expect(y).to.equal('b');

    let [first, ...second] = set;

    expect(first).to.equal('a');
    expect(second).to.deep.equal(['b','c']);
  });

  it('(2) 扩展运算符（...）也会调用默认的iterator接口。', () => {
    let str = 'hello';
    expect([...str]).to.deep.equal(['h','e','l','l','o']);

    let arr = ['b','c'];
    expect(['a', ...arr, 'd']).to.deep.equal(['a', 'b', 'c', 'd']);
  });

  it('(3) yield* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。', () => {
    let generator = function* () {
      yield 1;
      yield* [2,3,4];
      yield 5;
    };

    let iterator = generator();

    expect(iterator.next()).to.deep.equal({value:1, done: false});
    expect(iterator.next()).to.deep.equal({value:2, done: false});
    expect(iterator.next()).to.deep.equal({value:3, done: false});
    expect(iterator.next()).to.deep.equal({value:4, done: false});
    expect(iterator.next()).to.deep.equal({value:5, done: false});
    expect(iterator.next()).to.deep.equal({value:undefined, done: true});
  });
});

describe('4. 字符串的Iterator接口', () => {
  it('(1) 字符串是一个类似数组的对象，也原生具有Iterator接口。', () => {
    let someThing = 'hi';
    expect(typeof someThing[Symbol.iterator]).to.equal('function');

    let iterator = someThing[Symbol.iterator]();
    expect(iterator.next()).to.deep.equal({value:'h', done: false});
    expect(iterator.next()).to.deep.equal({value:'i', done: false});
    expect(iterator.next()).to.deep.equal({value:undefined, done: true});
  });

  it('(2) 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。', () => {
    let str = new String("hi");
    expect([...str]).to.deep.equal(['h','i']);

    str[Symbol.iterator] = function() {
      return {
        next() {
          if(this._first) {
            this._first = false;
            return { value: 'bye', done: false}
          } else {
            return { done: true }
          }
        },
        _first: true
      };
    };

    expect([...str]).to.deep.equal(['bye']);
    expect(typeof str).to.equal('object');
    expect(str.toString()).to.equal('hi');
  });
});

describe('5. Iterator接口与Generator函数', () => {
  it('(1) Symbol.iterator方法的最简单实现，还是使用下一章要介绍的Generator函数。', () =>{
    let myIterable = {};
    myIterable[Symbol.iterator] = function* () {
      yield 1;
      yield 2;
      yield 3;
    };

    expect([...myIterable]).to.deep.equal([1,2,3]);

    let obj = {
      * [Symbol.iterator]() {
        yield 'hello';
        yield 'world';
      }
    };

    let it = obj[Symbol.iterator]();
    expect(it.next()).to.deep.equal({value: 'hello', done: false});
    expect(it.next()).to.deep.equal({value: 'world', done: false});
    expect(it.next()).to.deep.equal({value: undefined, done: true});
  });
});

describe('6. 遍历器对象的return()，throw()', () => {
  it('(1) 如果for...of循环提前退出（通常是因为出错，或者有break语句或continue语句），就会调用return方法。', () => {
    class A {
      constructor(start, end){
        this.value = start;
        this.end = end;
      }

      [Symbol.iterator]() { return this; }
      next() {
        let value = this.value;

        if(value < this.end) {
          this.value ++;
          return {done: false, value: value}
        }
        return {done: true, value: undefined}
      }
      // 部署return的方法
      return() {
        console.log('call return function');
        return {done: true}
      }
    }

    let it = new A(0,3),
        index = 0;
    for(let item of it) {
      if(item === 1) break;
      expect(item).to.equal(index);
      index++;
    }
  });
});

describe('7. for...of循环', () => {
  it('(1) 数组原生具备iterator接口', () => {
    const arr = ['red','green', 'blue'];
    const obj = {};
    obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

    let index = 0;
    for(let v of obj) {
      expect(v).to.equal(arr[index]);
      index ++;
    }
  });

  it('(2) for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。', () => {
    let arr = [3,5,7];
    arr.foo = 'hello';
    let res = [];
    for(let i in arr) {
      res.push(i);
    }

    expect(res).to.deep.equal(['0','1','2','foo']);

    let res2 = [];
    for(let i of arr) {
      res2.push(i);
    }

    expect(res2).to.deep.equal([3,5,7]);
  });

  it('(3) Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用for...of循环。', () => {
    let arr = ['Gecko', 'Trident', 'Webkit', 'Webkit'];
    let engines = new Set(arr);
    let index = 0;
    for(let e of engines) {
      expect(e).to.equal(arr[index]);
      index ++;
    }

    let es6 = new Map();
    es6.set("edition", 6);
    es6.set("committee", "TC39");
    es6.set("standard", "ECMA-262");
    for (let [name, value] of es6) {
      console.log(name + ": " + value);
    }
  });
});