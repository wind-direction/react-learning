/**
 * todo: 字符串的扩展
 * ref: http://es6.ruanyifeng.com/#docs/string
 * Created by wind on 17/4/26.
 */
let chai = require('chai');
let expect = chai.expect;

describe('2.codePointAt()', function(){
 it('测试【𠮷】', function() {
   var s = "𠮷";
   expect(s.length).to.equal(2);
   console.log('charAt()');
   console.log(s.charAt(0));
   console.log(s.charAt(1));
   console.log('charCodeAt()');
   let [ char0, char1 ] = [ s.charCodeAt(0), s.charCodeAt(1) ].map( charCode => charCode.toString(16).toUpperCase() );
   console.log(char0);
   console.log(char1);
   expect(char0).to.equal('D842');
   expect(char1).to.equal('DFB7');
 });
});

describe('3.String.fromCodePoint() ', function() {
  it('String.fromCharCode不能识别大于0xFFFF的码点', function() {
    let str = '0x20BB7';
    console.log(String.fromCharCode(str));
  });
  it('ES6提供了String.fromCodePoint方法，可以识别大于0xFFFF的字符', function() {
    let str = '0x20BB7';
    let char = String.fromCodePoint(str);
    console.log(char);
    expect(char).to.equal('𠮷');
  });
});

describe('4.字符串的遍历器接口', function() {

  it('使用for循环遍历', function() {
    let str = '0x20BB7';
    let char = String.fromCodePoint(str);
    console.log(char);
    for(let i = 0; i < char.length; i++){
      console.log(char[i]);
    }
  });

  it('使用for...of循环遍历', function() {
    let str = '0x20BB7';
    let char = String.fromCodePoint(str);
    for(let i of char) {
      console.log(i);
    }
  });
});

describe('7.includes(), startsWith(), endsWith()', function(){
  it('includes()：返回布尔值，表示是否找到了参数字符串', function(){
    let str = 'hello wind !';
    expect(str.includes('wind')).to.equal(true);
  });

  it('startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部', function(){
    let str = 'hello wind !';
    expect(str.startsWith('hello')).to.equal(true);
  });

  it('endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。', function(){
    let str = 'hello wind !';
    expect(str.endsWith('!')).to.equal(true);
  });
});

describe('8.repeat() ', function() {
  it('重复',function(){
    let str = 'lala ';
    let result = str.repeat(2);
    console.log(result);
    expect(result).to.equal('lala lala ');
  })
});

describe('9.补全长度功能 padStart(), padEnd()', function(){
  it('padStart()', function(){
    let codeId = '87643';
    let lastCode = codeId.padStart(16 - codeId.length, '0');
    console.log('['+codeId+':'+lastCode+']');
    expect(lastCode).to.equal('0000000000087643');
  });

  it('padEnd()', function(){
    let codeId = '87643';
    let lastCode = codeId.padEnd(16 - codeId.length, '0');
    console.log('['+codeId+':'+lastCode+']');
    expect(lastCode).to.equal('8764300000000000');
  });
});

describe('10.模板字符串', function() {
  it('模板字符串', function() {
    let user = { name: 'wind' };
    let str = `There is a man who called ${user.name}`;
    console.log(str);
  });
});
