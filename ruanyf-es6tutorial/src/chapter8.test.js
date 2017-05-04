/**
 * todo: 函数的扩展
 * ref: http://es6.ruanyifeng.com/#docs/function
 * Created by wind on 17/5/2.
 */

let iterlib = require('iterlib');
let map = iterlib.map;
let takeWhile = iterlib.filter;
let forEach = iterlib.every;
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
});

describe('2. reset参数', function(){
  it('(1) function func(...vals){} vals指向函数的多余参数，是一个数组，不再使用arguments. func(1,2,3)',function(){
    function func(...vals){
      expect(vals[0]).to.equal(1);
      expect(vals[1]).to.equal(2);
      expect(vals[2]).to.equal(3);
    }

    func(1,2,3);
  });

  it('(2) 判断arguments与reset参数一致,func(1,2,3)', function(){
    function func(){
      return Array.prototype.slice.call(arguments).sort();
    }

    function func1(...values){
      return values;
    }

    let a = func(1,2,3);
    let b = func1(1,2,3);
    a.forEach(function(item, key){
      expect(item).to.equal(b[key]);
    });
  });
});

describe('3. 扩展运算符', function(){
  it('(1) 扩展运算符主要用于函数调用f(-1, ...[0,1], 2, ...[3])=>[-1,0,1,2,3]', function(){
    function f(v,w,x,y,z){
      return [v,w,x,y,z];
    }

    let args = [0,1];
    let b = f(-1, ...args,2, ...[3]);
    expect(b[0]).to.equal(-1);
    expect(b[1]).to.equal(0);
    expect(b[2]).to.equal(1);
    expect(b[3]).to.equal(2);
    expect(b[4]).to.equal(3);
  });
  it('(2)替代数组的apply方法, Math.max.apply(null, [14,3,77]) = Math.max(...[14,3,77]) = 77', function(){
    let maxA = Math.max.apply(null, [14,3,77]),
        maxB = Math.max(...[14,3,77]);
    expect(maxA).to.equal(maxB);
  });
  it('(3-1) 扩展运算符的应用：合并数组： [1,2].concat([3,4]) === [...[1,2], ...[3,4]]', function(){
    let arr1 = [1,2].concat([3,4]),
        arr2 = [...[1,2], ...[3,4]];
    arr1.forEach(function(item, key){
      expect(item).to.equal(arr2[key]);
    });
  });
  it('(3-2) 扩展运算符的应用：与解构赋值结合： [first, ...rest] = [1,2,3,4,5]=>first = 1, rest=[2,3,4,5]', function(){
    let [first, ...rest] = [1,2,3,4,5];
    expect(first).to.equal(1);
    expect(rest.length).to.equal(4);
    rest.forEach(function(item, key){
      expect(item).to.equal(key + 2);
    });
  });
});

describe('6. 箭头函数', function() {
  it('(1) this指针的变化', function(){
    let foo = () => {
      setTimeout(() => {
        console.log('id:', this.id);
      }, 100);
    };

    foo({id: 2});
  });
});

describe('7. 绑定this', function(){
  it('(1) foo::bar 等同于bar.bind(foo)', function(){
    let foo = {
      title: 'fooFunc',
      getTitle: function(){ return this.title; }
    };
    let bar = {title: 'barFunc'};

    let barClone1 = foo.getTitle.bind(bar);
    expect(barClone1()).to.equal('barFunc');

    let bar2 = { title: 'bar2Func'};
    let barClone2 = bar2::foo.getTitle;
    expect(barClone2()).to.equal('bar2Func');
  });

  it('(2) ::双冒号运算符返回的还是原对象，因此可以采用链式写法。', function(){
    let player = (strength) => {
      return {
        strength : strength,
        character: () => ({ strength: strength, time: (new Date()).getTime() })
      }
    };
    let getPlayers = function(){
      return [ player(100), player(90), player(102), player(103) ];
    };
    getPlayers()
      ::map(x=>x.character())
      ::takeWhile( x=>x.strength > 100 )
      ::forEach(x=>console.log(x));
  });
});

