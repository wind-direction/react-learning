/**
 * todo: 变量的解构赋值
 * ref: http://es6.ruanyifeng.com/#docs/destructuring
 * Created by wind on 17/4/26.
 * command: mocha src/chapter3.test.js
 */
var chai = require('chai');
var expect = chai.expect;

describe('1.数组的解构赋值', function() {
  it('嵌套数组进行结构',function() {
    let [foo, [[bar], baz]] = [1, [[2], 3]];

    expect(foo).to.equal(1);
    expect(bar).to.equal(2);
    expect(baz).to.equal(3);

    let [ , , third] = ['foo', 'bar', 'baz'];

    expect(third).to.equal('baz');

    let [x, , y] = [1, 2, 3];
    expect(x).to.equal(1);
    expect(y).to.equal(3);

    let [head, ...tail] = [1, 2, 3, 4];
    expect(head).to.equal(1);
    expect(tail instanceof Array ).to.equal(true);
    expect(tail.length).to.equal(3);

    let [a, b, ...z] = ['a'];
    console.log(a);
    expect(a).to.equal('a');
    console.log(b);
    expect(typeof b).to.equal('undefined');
    console.log(z);
    expect(z instanceof Array).to.equal(true);
  });

  it('如果默认值是一个表达式，则这个表达式是惰性求值得', function() {
    function func() {
      console.log('test test');
    }

    let [x = func()] = ['a'];
    expect(typeof x).to.equal('string');
    expect(x).to.equal('a');
  });
});

describe('2.对象的结构赋值', function() {
  it('属性同名即可赋值', function(){
    let { bar, foo, baz } = {foo: 'aaa', bar: 'bbb' };

    expect(bar).to.equal('bbb');
    expect(foo).to.equal('aaa');
    expect(typeof baz).to.equal('undefined');
  });

  it('变量名和属性名不一致,先找到同名属性，然后再赋给对应的变量', function() {
    let {foo: baz} = {foo: 'aaa', bar: 'bbb'};
    expect(baz).to.equal('aaa');
    expect(typeof foo).to.equal('undefined');
  });

  it('对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错', function() {
    let foo;
    // let {foo} = {foo: 1};
    ({foo} = {foo: 1});
    expect(foo).to.equal(1);
  });

  it('嵌套赋值', function() {
    let node = {
      loc: {
        start: {
          line: 1,
          column: 5
        }
      }
    };

    let {loc: {start: { line }} } = node;
    expect(line).to.equal(1);
    expect(typeof loc).to.equal('undefined');
    expect(typeof start).to.equal('undefined');
  });

  it('指定默认值', function(){
    let {x = 3} = {};
    expect(x).to.equal(3);

    var {a, b = 5} = {a: 1};
    expect(a).to.equal(1);
    expect(b).to.equal(5);
  });
});

describe('3.字符串的解构赋值', function() {
  it('解构赋值', function(){
    const [a,b,c,d,e] = 'hello';
    expect(a).to.equal('h');
    expect(b).to.equal('e');
    expect(c).to.equal('l');
    expect(d).to.equal('l');
    expect(e).to.equal('o');
  });

  it('字符串使用的方法可以用来赋值', function(){
    let {length: len} = 'hello';
    expect(len).to.equal(5);
  });
});

describe('4.数值和布尔值的解构赋值', function() {
  it('如果等号右边是数值或布尔值，则会先转为对象',function(){
    let {toString: NumTurnToString} = 123;
    console.log(NumTurnToString);
    expect(NumTurnToString).to.equal(Number.prototype.toString);
    let {toString: boolTurnToString} = true;
    console.log(boolTurnToString);
    expect(boolTurnToString).to.equal(Boolean.prototype.toString);
  });
});

describe('5.函数参数的结构赋值', function() {
  it('函数的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量', function(){
    let arr = [[1,2], [3, 4]].map( ([a, b]) => a + b);
    expect(arr instanceof Array).to.equal(true);
    expect(arr[0]).to.equal(3);
    expect(arr[1]).to.equal(7);
  });
  it('函数解构使用默认值', function(){
    function move({x = 0, y = 0} = {}) {
      return [x, y];
    }
    let arr = move({x: 3, y: 8});
    expect(arr instanceof Array).to.equal(true);
    expect(arr[1]).to.equal(8);
  });

  it('函数解构为参数指定默认值，而不是为变量指定默认值', function(){
    function move({x, y} = {x: 0, y: 0}) {
      return [x, y];
    }

    let arr = move({x: 3});
    expect(arr instanceof Array).to.equal(true);
    expect(typeof arr[1]).to.equal('undefined');
  });
});


