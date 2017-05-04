/**
 * todo: let 和 const 命令
 * ref: http://es6.ruanyifeng.com/#docs/let
 * Created by wind on 17/4/26.
 */

var expect = require('chai').expect;

describe('暂时性死区（TDZ: Temporal dead zone）', function() {
  it('example', function(){
    var tmp = 123;
    if (true) {
      tmp = 'abc';    // ReferenceError: tmp is not defined
      let tmp;
    }
  });

  it('比较隐蔽的死区[x=y,y=2]', function(){
    function bar(x = y, y = 2) {
      return [x, y];
    }
    bar();
  });

  it('比较隐蔽的死区[x=2,y=x]', function(){
    function bar(x = 2, y = x) {
      return [x, y];
    }
    bar();
  });
});

describe('块级作用域', function(){
  it('ES5内层变量覆盖外层变量',function(){
    var tmp = new Date();
    function f() {
      console.log(tmp);
      if(false){
        var tmp = 'hello world';
      }
    }
    f();
  });

  it('ES5计数用的循环变量泄露为全局变量', function() {
    var s = 'hello';
    for(var i = 0; i < s.length; i++) {
      console.log(s[i]);
    }
    console.log(i);
  });

  // ES6 块级作用域
  it('ES6 块级作用域', function() {
    function f1() {
      let n = 5;
      if(true) {
        let n = 10;
      }
      console.log(n);
    }

    f1();
  });

  it('ES5 块级作用域与函数说明', function() {
    if (true) {
      function f() {}
    }

    // 情况二
    try {
      function f2() {}
    } catch(e) {
      // ...
    }
  });

  it('ES5 块级作用域的说明', function() {
    function func() { console.log('I am outside!'); }

    (function () {

      if (false) {
        // 重复声明
        function func() { console.log('I am inside!'); }
      }
      func();
    }());
  });
});

describe('const 命令', function() {
  it('声明但未初始化', function() {
    // const foo; // SyntaxError: Missing initializer in const declaration
  });

  it('声明const型对象，属性可以变化', function() {
    const foo = {};
    expect(Object.keys(foo).length).to.equal(0);
    foo.name = 'test';
    foo.key = 'append';
    expect(Object.keys(foo).length).to.equal(2);
  });

  it('冻结对象', function() {
    var constantize = (obj) => {
      Object.freeze(obj);
      Object.keys(obj).forEach( (key) => {
        if (typeof obj[key] === 'object') {
          constantize( obj[key] );
        }
      });
    };

    var foo = {
      name: 'test',
      key: 'append'
    };
    expect(Object.keys(foo).length).to.equal(2);
    //冻结对象
    constantize(foo);
    // 添加对象
    foo.appendKey = 'test2';
    expect(Object.keys(foo).length).to.equal(3);
  });
});