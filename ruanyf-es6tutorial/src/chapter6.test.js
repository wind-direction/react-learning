/**
 * todo: 数值的扩展
 * ref: http://es6.ruanyifeng.com/#docs/number
 * Created by wind on 17/4/28.
 * command: mocha src/chapter6.test.js
 */
let chai = require('chai');
let expect = chai.expect;

describe('1. 二进制和八进制表示法', function(){
  it('(1) 二进制0b(或者0B):0b111110111 === 503 为true，八进制0o（或0O）0o767 === 503 为true', function(){
    expect(0b111110111).to.equal(503);
    expect(0o767).to.equal(503);
  });
});
describe('2. Number.isFinite(), Number.isNaN()', function(){
  it('(1) Number.isFinite(15)有限，为真；Number.isFinite("foo") 无限，为假', function(){
    expect(Number.isFinite(15)).to.equal(true);
    expect(Number.isFinite('foo')).to.equal(false);
  });
  it('(2) Number.isNaN(15) 不是NaN，为false,  Number.isNaN(NaN) 为NaN，为true', function(){
    expect(Number.isNaN(15)).to.equal(false);
    expect(Number.isNaN(NaN)).to.equal(true);
  });
  it('(3) 全局的isFinite("25")为真，Number.isFinite("25")为假', function(){
    expect(isFinite("25")).to.equal(true);
    expect(Number.isFinite("25")).to.equal(false);
  });
  it('(4) 全局的isNaN("NaN")为真，Number.isNaN("NaN")为假', function(){
    expect(isNaN("NaN")).to.equal(true);
    expect(Number.isNaN("NaN")).to.equal(false);
  });
});
describe('3 ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。', function(){
  it('(1) parseInt("12.32") === Number.parseInt("12.32")', function(){
    expect(parseInt("12.32")).to.equal(Number.parseInt("12.32"));
  });
  it('(1) parseFloat("123.45#") === Number.parseFloat("123.45#")', function(){
    expect(parseFloat("123.45#")).to.equal(Number.parseFloat("123.45#"));
  });
});
describe('4 Number.isInteger()用来判断一个值是否为整数。整数和浮点数是同样的储存方法，所以3等同于3.0',function(){
  it('(1) Number.isInteger(25) === true', function(){
    expect(Number.isInteger(25)).to.equal(true);
  });
  it('(2) Number.isInteger(25.0) === true', function(){
    expect(Number.isInteger(25.0)).to.equal(true);
  });
  it('(3) Number.isInteger(25.1) === false', function(){
    expect(Number.isInteger(25.1)).to.equal(false);
  });
  it('(4) Number.isInteger("15") === false', function(){
    expect(Number.isInteger("15")).to.equal(false);
  });
  it('(5) Number.isInteger(true) === false', function(){
    expect(Number.isInteger(true)).to.equal(false);
  });
});
describe('5 ES6在Number对象上面，新增一个极小的常量Number.EPSILON', function(){
  it('(1) 浮点数计算不准:0.1+0.2 !== 0.3', function(){
    expect(0.1+0.2 === 0.3).to.equal(false);
    expect(0.1+0.2 - 0.3 > 0).to.equal(true);
  });
  it('(2) Math.abs(0.1+0.2-0.3) < Number.EPSILON 看做(0.1+0.2) === 0.3', function(){
    let sum = 0.1 + 0.2,
        flag = Math.abs(sum - 0.3) < Number.EPSILON;
    expect(flag).to.equal(true);
  });
});
describe('6 安全整数和Number.isSafeInteger();JS整数范围:-2^53到2^53', function(){
  it('(1) 超出范围不能正确展示:Math.pow(2, 53) === Math.pow(2, 53) + 1', function(){
    expect(Math.pow(2, 53) === (Math.pow(2, 53) + 1)).to.equal(true);
  });
  it('(2) JS的整数范围-2^53到2^53 ', function(){
    let num = Math.pow(2, 53) - 1;
    expect(Number.MAX_SAFE_INTEGER).to.equal(num);
    expect(Number.MIN_SAFE_INTEGER).to.equal(-num);
  });
  it('(3) Number.isSafeInteger(32) === true && Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) === false', function(){
    expect(Number.isSafeInteger(32)).to.equal(true);
    expect(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).to.equal(false);
  });
});
describe('7 Math对象的扩展', function(){
  it('(1) Math.trunc方法用于去除一个数的小数部分，返回整数部分', function(){
    expect(Math.trunc(4.1)).to.equal(4);
    expect(Math.trunc(-4.3)).to.equal(-4);
    expect(Math.trunc('123.456')).to.equal(123);
  });
  it('(2) Math.sign方法用来判断一个数到底是正数、负数、还是零。', function() {
    expect(Math.sign(-5)).to.equal(-1);
    expect(Math.sign(5)).to.equal(1);
    expect(Math.sign(0)).to.equal(0);
    expect(Math.sign(-0)).to.equal(-0);
  });
  it('(3) Math.cbrt方法用于计算一个数的立方根。', function() {
    expect(Math.cbrt(1)).to.equal(1);
    expect(Math.cbrt(0)).to.equal(0);
    expect(Math.cbrt(-8)).to.equal(-2);
    expect(Math.cbrt(27)).to.equal(3);
  });
  it('(4) Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0。', function() {
    let num = 1 << 2;
    expect(Math.clz32(1)).to.equal(31);
    expect(Math.clz32(num)).to.equal(29);
    expect(num).to.equal(4);
  });
});
describe('8 Math.signbit() 判断一个值的正负', function(){});
describe('9 ES2016 新增了一个指数运算符（**）。', function(){
  it('(1) 2**4 === 16', function(){
    expect(2**4).to.equal(16);
  });
});