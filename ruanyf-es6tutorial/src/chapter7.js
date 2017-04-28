/**
 * todo: 数组的扩展
 * ref: http://es6.ruanyifeng.com/#docs/array
 * Created by wind on 17/4/28.
 */
let chai = require('chai');
let expect = chai.expect;

describe('1 Array.from()', function() {
  it('(1) [].slice.call() 与Array.from 类似', function(){
    let arrayLike = {
      '0': 'a',
      '1': 'b',
      '2': 'c',
      length: 3
    };
    let arr1 = Array.prototype.slice.call(arrayLike);
    let arr2 = Array.from(arrayLike);
    expect(arr1 instanceof Array).to.equal(true);
    expect(arr2 instanceof Array).to.equal(true);
    arr1.forEach(function(val, key){
      expect(val).to.equal(arr2[key]);
    });
  });
  it('(2) ...扩展符不能扩展出[undefined, undefined, undefined]这一类的数据结构，但是Array.from可以', function(){
    let arr = Array.from({length: 3});
    arr.forEach(function(item){
      expect(item).to.equal(undefined);
    });
  });
});

describe('2 Array.of()方法用于将一组值，转换为数组。', function() {
  it('(1) Array(3)生成[null,null,null]',function(){
    let arr = Array(3);
    arr.forEach(function(item){
      expect(item).to.equal(null);
    });
  });
  it('(2) Array.of(3)生成[3]',function(){
    let arr = Array.of(3);
    expect(arr.length).to.equal(1);
    expect(arr[0]).to.equal(3);
  });
});

describe('3 数组实例的copyWithin() ', function() {
  it('(1) [1,2,3,4,5,6].copyWithin(0,3) === [4,5,6,4,5,6]',function(){
    let arr = [1,2,3,4,5,6].copyWithin(0,3),
        res = [4,5,6,4,5,6];
    arr.forEach(function(item, key){
      expect(item).to.equal(res[key]);
    });
  });
  it('(2) [1,2,3,4,5,6].copyWithin(2,3) === [1,2,4,5,6,4]',function(){
    let arr = [1,2,3,4,5,6].copyWithin(2,3),
        res = [1,2,4,5,6,6];
    arr.forEach(function(item, key){
      expect(item).to.equal(res[key]);
    });
  });
});

describe('4 数组实例的find()和findIndex()', function() {
  it('(1) find()找出第一个符合条件的数组成员', function(){
    let posi = [1, 4, -5, 10].find((n) => n < 0);
    expect(posi).to.equal(-5);
  });
  it('(2) findIndex()返回第一个符合条件的数组成员的位置', function(){
    let posi = [1, 4, -5, 10].findIndex((n) => n < 0);
    expect(posi).to.equal(2);
  });
});

describe('5 数组实例的fill()', function() {
  it('(1) fill()空数组的初始化非常方便', function(){
    let arr = new Array(3).fill(7);
    arr.forEach(function(item){
      expect(item).to.equal(7);
    });
  });
  it('(2) fill()方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置', function(){
    let arr = ['a', 'b', 'c'].fill(7, 1, 3);
    expect(arr[0]).to.equal('a');
    expect(arr[1]).to.equal(7);
    expect(arr[2]).to.equal(7);
  });
});

describe('6 数组实例的entries()，keys()和values()', function() {

});

describe('7 数组实例的includes()', function() {

});

describe('8 数组的空位 ', function() {

});

