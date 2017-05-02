/**
 * todo: 函数的扩展
 * ref: http://es6.ruanyifeng.com/#docs/function
 * Created by wind on 17/5/2.
 */
let chai = require('chai');
let expect = chai.expect;

describe('1. 函数参数的默认值', function(){
  it('(1) 如果参数默认值是变量，那么参数就不是传值的，参数默认值是惰性求值的。', function(){
    let x = 99;

    function foo(p = x + 1){ return p; }

    let firstVal = foo();

    x += 900;
    let secondVal = foo();
    expect(x).to.equal(999);
    expect(firstVal).to.equal(100);
    expect(secondVal).to.equal(1000);
  });

  it('(2) 与对象解构赋值默认值结合使用', function(){
    function foo({x, y = 5}) {
      return [x, y];
    }

    let arr1 = foo({}),
        arr2 = foo({x: 1}),
        arr3 = foo({x: 1, y: 2});
    expect(arr1[0]).to.equal(undefined);
    expect(arr1[1]).to.equal(5);
    expect(arr2.join(',')).to.equal('1,5');
    expect(arr3.join(',')).to.equal('1,2');
  });

  it('(3) 设置函数参数默认值是空对象, 但是设置了对象解构赋值的默认值:function m1({x = 0, y = 0} = {})',function(){
    function m1({x= 0, y= 0} = {}) {
      return [x, y];
    }

    let arr1 = m1(),
        arr2 = m1({x: 3, y: 8}),
        arr3 = m1({x: 3}),
        arr4 = m1({}),
        arr5 = m1({z: 3});
    expect(arr1.join(',')).to.equal('0,0');
    expect(arr2.join(',')).to.equal('3,8');
    expect(arr3.join(',')).to.equal('3,0');
    expect(arr4.join(',')).to.equal('0,0');
    expect(arr5.join(',')).to.equal('0,0');
  });

  it('(4) 设置函数参数默认值是空对象, 但是设置了对象解构赋值的默认值:function m2({x, y} = { x: 0, y: 0 })',function(){
    function m2({x, y} = { x: 0, y: 0 }) {
      return [x, y];
    }

    let arr1 = m2(),                // [0,0]
      arr2 = m2({x: 3, y: 8}),      // [0,0]
      arr3 = m2({x: 3}),            // [3, undefined]
      arr4 = m2({}),                // [undefined, undefined]
      arr5 = m2({z: 3});            // [undefined, undefined]
    expect(arr1.join(',')).to.equal('0,0');
    expect(arr2.join(',')).to.equal('3,8');
    expect(arr3.join(',')).to.equal('3,');
    expect(arr3[1]).to.equal(undefined);
    expect(arr4[0]).to.equal(undefined);
    expect(arr4[1]).to.equal(undefined);
    expect(arr5[0]).to.equal(undefined);
    expect(arr5[1]).to.equal(undefined);
  });

  it('(5) 设置了参数的默认值，函数进行声明初始化的时候，参数会形成一个单独的作用域，初始化结束后，作用域消失。function f(x, y = x){ console.log(y) }; f(2)=>2', function(){
    let x = 'global_x';

    function f(x, y = x) {
      return y;
    }

    let x1 = f('inside_x');
    expect(x1).to.equal('inside_x');
  });

  it('(6) 参数的默认值是一个函数，该函数的作用域也遵守这个规则', function(){
    let foo = 'outer';

    function bar(func = x => foo) {
      let foo = 'inner';
      return func();
    }

    let foo1 = bar();
    expect(foo1).to.equal('outer');
  });

  it('(7) ')
});

