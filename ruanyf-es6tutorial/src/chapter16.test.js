/**
 * todo: Generator 函数的语法
 * ref: http://es6.ruanyifeng.com/#docs/generator
 * command: mocha src/chapter16.test.js --compilers js:babel-core/register
 * Created by wind on 17/5/25.
 */

import { expect } from 'chai';
import path from 'path';
import FileReader from '../components/FileReader';

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
  it('(1) 如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。', () => {
    function* foo() {
      yield 'a';
      yield 'b';
    }

    function* bar() {
      yield 'x';
      foo();
      yield 'y';
    }

    let b = new bar();
    expect(b.next()).to.deep.equal({value: 'x', done: false});
    expect(b.next()).to.deep.equal({value: 'y', done: false});
    expect(b.next()).to.deep.equal({value: undefined, done: true});
  });

  it('(2) yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。', () => {
    function* bar() {
      yield 'x';
      yield* foo();
      yield 'y';
    }

    function* foo() {
      yield 'a';
      yield 'b';
    }



    let b = new bar();
    expect(b.next()).to.deep.equal({value: 'x', done: false});
    expect(b.next()).to.deep.equal({value: 'a', done: false});
    expect(b.next()).to.deep.equal({value: 'b', done: false});
    expect(b.next()).to.deep.equal({value: 'y', done: false});
    expect(b.next()).to.deep.equal({value: undefined, done: true});
  });

  it('(3) outer1返回一个遍历器对象，outer2返回该遍历器对象的内部值。',() => {
    function* inner() {
      yield 'hello!';
    }

    function* outer1() {
      yield 'open';
      yield inner();
      yield 'close';
    }

    let gen = outer1();
    expect(gen.next().value).to.equal('open'); // "open"
    expect(gen.next().value instanceof inner).to.equal(true);     // 返回一个遍历器对象
    expect(gen.next().value).to.equal('close');// "close"

    function* outer2() {
      yield 'open';
      yield* inner();
      yield 'close';
    }

    let gen1 = outer2();
    expect(gen1.next().value).to.equal("open");   // "open"
    expect(gen1.next().value).to.equal("hello!"); // "hello!"
    expect(gen1.next().value).to.equal("close");  // "close"
  });

  it('(4) yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。', () =>{
    function * concat(iter1, iter2) {
      yield* iter1;
      yield* iter2;
    }

    function * concat1(iter1, iter2) {
      for(let value of iter1) {
        yield value;
      }

      for(let value of iter2) {
        yield value;
      }
    }

    function* gen1() {
      yield 1;
      yield 2;
    }

    function* gen2() {
      yield 1;
      yield 2;
    }

    let g1 = concat(gen1(), gen2());
    let g2 = concat1(gen1(), gen2());
    let res = [], res2 = [];

    for(let val of g1) {
      res.push(val);
    }

    for(let val of g2) {
      res2.push(val);
    }

    expect(res).to.deep.equal(res2);
  });

  it('(5) 如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。', () =>{
    function * gen() {
      yield* ["a","b","c"];
    }

    let g = gen();
    expect(g.next().value).to.equal('a');
    expect(g.next().value).to.equal('b');
    expect(g.next().value).to.equal('c');
    expect(g.next().value).to.equal(undefined);
  });

  it('(6) 实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。', () => {
    let read = (function* () {
      yield 'hello';
      yield* 'hello';
    })();

    expect(read.next().value).to.equal('hello'); // "hello"
    expect(read.next().value).to.equal('h'); // "h"
  });

  it('(7) 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。', () => {
    function *foo() {
      yield 2;
      yield 3;
      return "foo";
    }

    function *bar() {
      yield 1;
      let v = yield *foo();
      console.log( "v: " + v );
      yield 4;
    }

    var it = bar();

    expect(it.next().value).equal(1); // {value: 1, done: false}
    expect(it.next().value).equal(2); // {value: 2, done: false}
    expect(it.next().value).equal(3); // {value: 3, done: false}
    expect(it.next().value).equal(4); // {value: 4, done: false}
    expect(it.next().value).equal(undefined); // {value: undefined, done: true}
  });

  it('(8) 另外一个例子', () => {
    function* genFuncWithReturn() {
      yield 'a';
      yield 'b';
      return 'The result';
    }

    function* logReturned(genObj) {
      let result = yield* genObj;
      console.log(result);
    }

    expect([...logReturned(genFuncWithReturn())]).to.deep.equal(['a','b']);
  });

  it('(9) yield*命令可以很方便地取出嵌套数组的所有成员。', () =>{
    function* iterTree(tree) {
      if(Array.isArray(tree)) {
        for(let i = 0; i< tree.length; i++ ){
          yield* iterTree(tree[i]);
        }
      } else {
        yield tree;
      }
    }

    const tree = ['a',['b','c'], ['d','e']];
    expect([...iterTree(tree)]).to.deep.equal(['a','b','c','d','e']);
  });

  it('(10) 使用yield* 遍历完全二叉树', () => {
    function Tree(left, label, right) {
      this.left = left;
      this.lable = label;
      this.right = right;
    }

    function* inorder(t) {
      if(t) {
        yield* inorder(t.left);
        yield t.lable;
        yield* inorder(t.right)
      }
    }

    // 生成二叉树
    function make(array) {
      //判断是否是叶子节点
      if(array.length === 1) return new Tree(null, array[0], null);
      return new Tree(make(array[0]), array[1], make(array[2]));
    }

    let tree = make([ [ ['a'], 'b', ['c'] ], 'd', [ ['e'], 'f', ['g'] ] ]);

    //遍历二叉树
    let result = [];
    for(let node of inorder(tree)) {
      result.push(node);
    }

    expect(result).to.deep.equal(['a','b','c','d','e','f','g']);
  });
});

describe('7. 作为对象属性的Generator函数', () => {
  it('(1) 如果一个对象的属性是 Generator 函数，可以简写成下面的形式。', () =>{
    let obj = {
      * myGeneratorFunc() {
        yield 1;
        yield 2;
        yield 3;
      }
    };

    expect([...obj.myGeneratorFunc()]).to.deep.equal([1,2,3]);
  });
});

describe('8. Generator 函数的this', () => {
  it('(1) Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。', () => {
    function * g() {}

    g.prototype.hello = () => 'hi';

    let obj = g();

    expect(obj instanceof g).to.equal(true);
    expect(obj.hello()).to.equal('hi');
  });

  it('(2) Generator函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性。', ()=> {
    function* g() {
      this.a = 11;
    }

    let obj = g();
    expect(obj.a).to.equal(undefined);
  });

  it('(3) Generator函数也不能跟new命令一起用，会报错。', () => {
    function* F() {
      yield this.x = 2;
      yield this.y = 3;
    }

    try {
      new F();
    }catch (e) {
      expect(e.name).to.equal('TypeError');
    }
  });

  it('(4) 生成一个空对象，使用call方法绑定 Generator 函数内部的this。这样就可以像普通函数那样进行this的操作', ()=> {
    function* F() {
      this.a = 1;
      yield this.b = 2;
      yield this.c = 3;
    }

    let obj = {};
    let f = F.call(obj);
    expect([...f]).to.deep.equal([2,3]);
    expect(obj.a).to.equal(1);
    expect(obj.b).to.equal(2);
    expect(obj.c).to.equal(3);
  });

  it('(5) 执行的是遍历器对象f，但是生成的对象实例是obj，有没有办法将这两个对象统一呢？一个办法就是将obj换成F.prototype。', () => {
    function* F() {
      this.a = 1;
      yield this.b = 2;
      yield this.c = 3;
    }
    let f = F.call(F.prototype);

    expect(f.next()).to.deep.equal({value: 2, done: false});  // Object {value: 2, done: false}
    expect(f.next()).to.deep.equal({value: 3, done: false});  // Object {value: 3, done: false}
    expect(f.next()).to.deep.equal({value: undefined, done: true});  // Object {value: undefined, done: true}

    expect(f.a).to.equal(1);
    expect(f.b).to.equal(2);
    expect(f.c).to.equal(3);
  });

  it('(6) 再将F改成构造函数，就可以对它执行new命令了。', () => {
    function* gen() {
      this.a = 1;
      yield this.b = 2;
      yield this.c = 3;
    }

    function F() {
      return gen.call(gen.prototype);
    }

    let f = new F();

    expect([...f]).to.deep.equal([2,3]);
    expect(f.a).to.equal(1);
    expect(f.b).to.equal(2);
    expect(f.c).to.equal(3);
  });
});

describe('9. 含义', () => {
  it('(1) Generator 与状态机', () => {
    let clock = function* () {
      while(true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
      }
    };

    let obj = clock();
    obj.next();
    obj.next();
  });

  it('(2) Generator与协程', () => {
    console.log('由于 JavaScript 是单线程语言，只能保持一个调用栈。引入协程以后，每个任务可以保持自己的调用栈。这样做的最大好处，就是抛出错误的时候，可以找到原始的调用栈。');
  });
});

describe('10.应用', () => {
  it('(1) 异步操作的同步化表达，通过 Generator 函数逐行读取文本文件。', () => {
    function* numbers() {
      let file = new FileReader(path.resolve(__dirname, '../api/numbers.txt'));
      try {
        while(!file.eof){
          let val = file.readLine();
          yield parseInt(val,10);
        }
      } finally {
        file.close();
      }
    }

    let obj = numbers();
    console.log(obj.next());
  });
});

