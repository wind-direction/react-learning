/**
 * todo: Generator 函数的语法
 * ref: http://es6.ruanyifeng.com/#docs/generator
 * command: mocha src/chapter16.test.js --compilers js:babel-core/register
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

  it('(4) yield表达式如果用在另一个表达式之中，必须放在圆括号里面。', () => {
    function * demo() {
      console.log('Hello' + (yield) );
    }

    let g = demo();
    g.next();
  });

  it('(5) 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。', () => {
    let myIterable = {};
    myIterable[Symbol.iterator] = function *() {
      yield 1;
      yield 2;
      yield 3;
    };

    expect([...myIterable]).to.deep.equal([1,2,3]);
  });

  it('(6) Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。', () => {
    function* gen() {}

    let g = gen();

    expect(g[Symbol.iterator]()).to.deep.equal(g);
  })
});

describe('2. next 方法的参数', () => {
  it('(1) yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。', () => {
    function* f() {
      for(let i = 0; true; i++) {
        let reset = yield i;
        if(reset) { i = -1;}
      }
    }

    let g = f();
    expect(g.next()).to.deep.equal({value: 0, done: false});
    expect(g.next()).to.deep.equal({value: 1, done: false});
    expect(g.next()).to.deep.equal({value: 2, done: false});
    expect(g.next(true)).to.deep.equal({value: 0, done: false});
    expect(g.next()).to.deep.equal({value: 1, done: false});
  });

  it('(2) 可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。', () => {
    function* foo(x) {
      let y = 2 *(yield (x + 1));
      let z = yield (y / 3);
      return (x + y + z);
    }

    let a = foo(5);
    expect(a.next()).to.deep.equal({value: 6, done: false});
    // a.next() : 等同于 yield (x + 1) 变成了 undefined；那么y 就成了 2*undefined = NaN， 之后执行yield(NaN/3) 输出NaN
    expect(a.next()).to.deep.equal({value: NaN, done: false});
    // a.next() : 等同于 yield (y / 3) 变成了undefined；那么z 就成了 undefined ， return (5 + NaN + undefined) = NaN
    expect(a.next()).to.deep.equal({value: NaN, done: true});

    let b = foo(5);
    expect(b.next()).to.deep.equal({value: 6, done: false});
    // b.next(12) : 等同于 yield (x + 1) 变成了12；那么y 就成了24， 之后执行yield(24/3) 输出8
    expect(b.next(12)).to.deep.equal({value: 8, done: false});
    // b.next(13) : 等同于 yield (y / 3) 变成了13；那么z 就成了13， return (5 + 24 + 13) = 42;
    expect(b.next(13)).to.deep.equal({value: 42, done: true});
  });

  it('(3) 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。', () => {
    function wrapper(generatorFunction) {
      return function( ...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
      };
    }

    const wrapped = wrapper(function* () {
      console.log(`First input: ${yield}`);
      return 'DONE';
    });

    wrapped().next('hello!');
  });

  it('(4) 再看一个通过next方法的参数，向 Generator 函数内部输入值的例子。', () => {
    function* dataConsumer() {
      console.log('Started');
      console.log(`1. ${yield}`);
      console.log(`2. ${yield}`);
      return 'result';
    }

    let genObj = dataConsumer();
    genObj.next();
    genObj.next('a');
    genObj.next('b');
  });
});

describe('3. for...of 循环', () => {
  it('(1) 再看一个通过next方法的参数，向 Generator 函数内部输入值的例子。', () => {
    function* fibonacci() {
      let [prev, curr] = [0, 1];
      for(;;) {
        [prev ,curr] = [curr, prev + curr];
        yield curr;
      }
    }

    let res = [];
    for(let n of fibonacci()) {
      if(n > 100) break;
      res.push(n);
    }
    expect(res).to.deep.equal([ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ]);
  });

  it('(2) 原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。', () => {
    function* objectEntries(obj) {
      let propKeys = Reflect.ownKeys(obj);

      for(let propKey of propKeys) {
        yield [propKey, obj[propKey]];
      }
    }

    let jane = {first:'Jane', last: 'Doe'};
    for(let [key, value] of objectEntries(jane)){
      console.log(`${key}: ${value}`);
    }
  });

  it('(3) 加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面。', () => {
    function* objectEntries() {
      let propKyes = Object.keys(this);
      for(let propKey of propKyes) {
        yield [propKey, this[propKey]];
      }
    }

    let jane = {first: 'Jane', last: 'Doe'};
    jane[Symbol.iterator] = objectEntries;
    for(let [key, value] of jane) {
      console.log(`${key}: ${value}`);
    }
  });
});

describe('4. Generator.prototype.throw()', () => {
  it('(1) Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获', () => {
    let g = function* (){
      try{
        yield;
      }catch (e) {
        console.log('内部捕获', e);
      }
    };

    let i = g();
    i.next();

    try {
      i.throw('a');
      i.throw('b');
    }catch(e) {
      console.log('外部捕获',e);
    }
  });

  it('(2) 遍历器对象的throw方法抛出的异常可以在Generator内部捕获，而用throw命令抛出的异常只能被函数体外的catch语句捕获。', () => {
    let g = function* () {
      while(true) {
        try {
          yield ;
        } catch(e) {
          if(e != 'a') throw e;
          console.log('内部捕获!', e);
        }
      }
    };

    let i = g();
    i.next();

    try {
      throw new Error('a');
      throw new Error('b');
    } catch(e) {
      console.log('外部捕获', `${e.name}: ${e.message}`);
    }
  });

  it('(3) 如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。', () => {
    let g = function* () {
      while(true) {
        yield;
        console.log(`内部捕获 ${e}`);
      }
    };

    let i = g();
    i.next();

    try {
      i.throw('a');
      i.throw('b');
    } catch(e) {
      console.log(`外部捕获 ${e}`);
    }
  });

  it('(4) 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。', () => {

    let gen = function * () {
      yield console.log('hello');
      yield console.log('world');
    };

    let g = gen();
    g.next();
    // g.throw(new Error('text')); 报错并直接退出，process不能捕获

  });

  it('(5) throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。', () => {
    let gen = function* (){
      try{
        yield console.log('a');
      } catch (e) {
        console.log(`内部捕获~`,e);
      }
      yield console.log('b');
      yield console.log('c');
    };

    let g = gen();
    g.next();
    g.throw('error');
    g.next();
  });

  it('(6) throw命令与g.throw方法是无关的，两者互不影响。', () => {
    let gen = function* () {
      yield console.log('hello');
      yield console.log('word');
    };

    let g = gen();
    g.next();

    try {
      throw new Error('error');
    } catch (e) {
      g.next();
    }
  });

  it('(7) Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。', () => {
    function * foo() {
      let x= yield 3;
      let y = x.toUpperCase();
      yield y;
    }

    let it = foo();
    it.next();
    try {
      it.next(42);
    } catch (e){
      console.log(`${e.name}: ${e.message}`);
    }
  });

  it('(8) 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，会到达遍历器的终点。', () => {
    function * g() {
      yield 1;
      console.log('throwing an exception');
      throw new Error('generator broke!');
      yield 2;
      yield 3;
    }

    function log(generator) {
      let v;
      console.log('starting generator');
      try {
        v = generator.next();
        console.log('第一次运行next方法',v);
      } catch(err) {
        console.log('捕获异常',v);
      }

      try {
        v = generator.next();
        console.log('第二次运行next方法',v);
      } catch(err) {
        console.log('捕获异常',v);
      }

      try {
        v = generator.next();
        console.log('第三次运行next方法', v);
      } catch (err) {
        console.log('捕捉错误', v);
      }
      console.log('caller done');
    }

    log(g());
  });
});

describe('5. Generator.prototype.return()', () => {
  it('(1) return方法，可以返回给定的值，并且终结遍历Generator函数。', () => {
    function* gen() {
      yield 1;
      yield 2;
      yield 3;
    }

    let g = gen();

    expect(g.next()).to.deep.equal({value: 1, done: false});
    expect(g.return('foo')).to.deep.equal({value: "foo", done: true});
    expect(g.next()).to.deep.equal({value: undefined, done: true});
  });

  it('(2) 如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。', () => {
    function * numbers() {
      yield 1;
      try {
        yield 2;
        yield 3;
      } finally {
        yield 4;
        yield 5;
      }

      yield 6;
    }

    let g = numbers();

    expect(g.next()).to.deep.equal({value: 1, done: false});
    expect(g.next()).to.deep.equal({value: 2, done: false});
    expect(g.return(7)).to.deep.equal({value: 4, done: false});
    expect(g.next()).to.deep.equal({value: 5, done: false});
    expect(g.next()).to.deep.equal({value: 7, done: true});
  });
});

describe('6. yield* 表达式', () => {
  
});

describe('7. 作为对象属性的Generator函数', () => {});

describe('8. Generator 函数的this', () => {});

describe('9. 含义', () => {});

describe('10.应用', () => {});