/**
 * todo: 对象的扩展
 * ref: http://es6.ruanyifeng.com/#docs/object
 * Created by wind on 17/5/5.
 */
import { expect } from 'chai';

describe('1. 属性的简洁表示法', function(){
  it('(1) ES6 允许直接写入变量和函数，作为对象的属性和方法。', function(){
    let foo = 'bar';
    let baz = {foo};
    expect(baz).to.deep.equal({foo:'bar'});
  });
});
describe('2. 属性名表达式', function(){});
describe('3. 方法的name属性', function(){});
describe('4. Object.is()', function(){});
describe('5. Object.assign()', function(){});
describe('6. 属性的可枚举性', function(){});
describe('7. 属性的遍历', function(){});
describe('8. __proto__属性，Object.setPrototypeOf(), Object.getPrototypeOf()', function(){});
describe('9. Object.keys(), object.values(), object.entries()', function(){});
describe('10. 对象的扩展运算符', function(){});
describe('11. Object.getOwnPropertyDescriptors()', function(){});
describe('12. Null传导运算符', function(){});
