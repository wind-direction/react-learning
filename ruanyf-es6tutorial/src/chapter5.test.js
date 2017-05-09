/**
 * todo: 正则的扩展
 * ref: http://es6.ruanyifeng.com/#docs/regex
 * Created by wind on 17/4/27.
 * command: mocha src/chapter5.test.js
 */
let chai = require('chai');
let expect = chai.expect;

describe('1.RegExp构造函数', function() {
  it('如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符：new RegExp(/xyz/,"i")修饰符是i', function() {
    let regex = new RegExp(/xyz/, 'i');
    expect(regex.flags).to.equal('i');
  });
});

describe('2.字符串的正则方法', function(){
  it('(1) match()：从【hello world】match(/^he(\w+)\s+(\w+)/)', function() {
    let str = 'hello world';
    let matchRes = str.match(/^he(\w+)\s+(\w+)/);
    expect(matchRes.length).to.equal(3);
    expect(matchRes[1]).to.equal('llo');
    expect(matchRes[2]).to.equal('world');
  });

  it('(2) replace()：将【hello world】中的空格替换成+', function() {
    let str = 'hello world';
    let str2 = str.replace(/\s+/, '+');
    expect(str2).to.equal('hello+world');
  });

  it('(3) search():从【hello world】中找出空格的位置为5', function() {
    let str = 'hello world';
    let position = str.search(/\s+/);
    expect(position).to.equal(5);
  });

  it('(4) split():将【hello world】按照空格进行拆分，数组长度为2', function(){
    let str = 'hello world';
    let arr = str.split(/\s+/);
    expect(arr.length).to.equal(2);
  });
});

describe('3.u修饰符，意为Unicode模式', function() {
  it("(0) /^\uD83D/u.test('\uD83D\uDC2A')为false", function() {
    expect(/^\uD83D/u.test('\uD83D\uDC2A')).to.equal(false);
    expect(/^\uD83D/.test('\uD83D\uDC2A')).to.equal(true);
  });
  it('(1) 对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符:/^.$/u.test("𠮷") 为true', function(){
    expect(/^.$/u.test("𠮷")).to.equal(true);
    expect(/^.$/.test('𠮷')).to.equal(false);
  });
  it('(2) Unicode字符表示法:/\u{20BB7}/u.test("𠮷")为true', function() {
    expect(/\u{20BB7}/u.test("𠮷")).to.equal(true);
    expect(/\u{61}/u.test('a')).to.equal(true);
    expect(/\u{61}/.test('a')).to.equal(false);
  });
  it('(3) 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的Unicode字符:/𠮷{2}/u.test("𠮷𠮷")为true', function(){
    expect(/a{2}/.test('aa')).to.equal(true);
    expect(/a{2}/u.test('aa')).to.equal(true);
    expect(/𠮷{2}/.test('𠮷𠮷')).to.equal(false);
    expect(/𠮷{2}/u.test('𠮷𠮷')).to.equal(true);
  });
  it('(4) u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的Unicode字符:/^\S$/u.test("𠮷")为true', function(){
    expect(/^\S$/u.test("𠮷")).to.equal(true);
    expect(/^\S$/.test("𠮷")).to.equal(false);
  });
  it('(5) i修饰符:有些Unicode字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K => /[a-z]/iu.test("\u212A")为true', function(){
    expect(/[a-z]/i.test('\u212A')).to.equal(false);
    expect(/[a-z]/iu.test('\u212A')).to.equal(true);
  });
});

describe('4.y修饰符,意为粘连(sticky)修饰符', function() {
  it('(1) /a+/y对于字符串aaa_aa_a执行两次操作，第二次为空', function(){
    let s = 'aaa_aa_a';
    let r1 = /a+/g;
    let r2 = /a+/y;

    let res1_1 = r1.exec(s);
    let res2_1 = r2.exec(s);
    expect(res1_1.length).to.equal(1);
    expect(res1_1[0]).to.equal('aaa');
    expect(res2_1.length).to.equal(1);
    expect(res2_1[0]).to.equal('aaa');

    let res1_2 = r1.exec(s);
    let res2_2 = r2.exec(s);
    expect(res1_2.length).to.equal(1);
    expect(res1_2[0]).to.equal('aa');
    expect(res2_2).to.equal(null);
  });

  it('(2) 使用lastIndex：对字符串xaya从2号位置（y）开始匹配/a/g，一次执行之后，lastIndex为4', function(){
    const REGEX = /a/g;
    REGEX.lastIndex = 2;
    const match = REGEX.exec('xaya');
    expect(match.index).to.equal(3);
    expect(REGEX.lastIndex).to.equal(4);
    // 在执行一次
    expect(REGEX.exec('xaxa')).to.equal(null);
  });
  it('(3) 使用lastIndex：/a/y对字符串xaya进行匹配，从2开始，第一次匹配失败', function(){
    const REGEX = /a/y;
    // 指定从2号位置开始匹配
    REGEX.lastIndex = 2;
    // 不是粘连，匹配失败
    expect(REGEX.exec('xaya')).to.equal(null); // null

    // 指定从3号位置开始匹配
    REGEX.lastIndex = 3;

    // 3号位置是粘连，匹配成功
    const match = REGEX.exec('xaxa');
    expect(match.index).to.equal(3); // 3
    expect(REGEX.lastIndex).to.equal(4) // 4
  });

  it('(4) y修饰符号隐含了头部匹配的标志^。在split方法中使用y修饰符，原字符串必须以分隔符开头。这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。', function(){
    let arr1 = 'x#x#'.split(/#/y);
    expect(arr1.length).to.equal(1);
    expect(arr1[0]).to.equal('x#x#');

    let arr2 = '#@a#@b#@c#@d'.split(/#@/y);
    expect(arr2.length).to.equal(2);
    expect(arr2[0]).to.equal('');
    expect(arr2[1]).to.equal('a#@b#@c#@d');
  });
});
