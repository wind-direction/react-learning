/**
 * todo: Class
 * ref: http://es6.ruanyifeng.com/#docs/class
 * command: mocha src/chapter19.test.js --compilers js:babel-core/register
 * Created by wind on 17/6/5.
 */
import { expect } from 'chai';

describe('1. Class基本语法', () => {
  it('(1-1) ES6 的类，完全可以看作构造函数的另一种写法。', () => {
    class Point {

    }

    expect(typeof Point).to.equal('function');
    expect(Point).to.deep.equal(Point.prototype.constructor);
  });

  it('(1-2) 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。', () => {
    class Point {
      constructor() {

      }
    }

    Object.assign(Point.prototype, {
      func1() {},
      func2() {}
    });
    expect(typeof Point.prototype.func1).to.equal('function');
    expect(typeof Point.prototype.func2).to.equal('function');
  });

  it('(1-3) 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。', () => {
    class Point {
      constructor(x, y) {

      }

      func1() {

      }
    }

    expect(Object.keys(Point.prototype)).to.deep.equal([]);
    expect(Object.getOwnPropertyNames(Point.prototype)).to.deep.equal(['constructor','func1']);
  });

  it('(2) 严格模式', () => {
    console.log('类和模块的内部，默认就是严格模式。');
  });

  it('(3) 上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。', () => {
    class Foo {
      constructor() {
        return Object.create(null);
      }
    }

    let instance = new Foo();
    expect(instance instanceof Foo).to.equal(false);
  });

  it('(4) 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。', () => {
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      func1() { return `(${this.x},${this.y})` }
    }

    let point = new Point(2,3);
    expect(point.func1()).to.equal('(2,3)');
    expect(point.hasOwnProperty('x')).to.equal(true);
    expect(point.hasOwnProperty('y')).to.equal(true);
    expect(point.hasOwnProperty('func1')).to.equal(false);
    expect(point.__proto__.hasOwnProperty('func1')).to.equal(true);

    let point2 = new Point(3,4);
    //与 ES5 一样，类的所有实例共享一个原型对象。
    expect(point.__proto__).to.deep.equal(point2.__proto__);
  });

  it('(5) ');
});
describe('2. Class的继承', () => {});
describe('3. 原生构造函数的继承', () => {});
describe('4. Class的取值函数（getter）和存值函数（setter）', () => {});
describe('5. Class 的 Generator 方法', () => {});
describe('6. Class 的静态方法', () => {});
describe('7. Class的静态属性和实例属性', () => {});
describe('8. 类的私有属性', () => {});
describe('9. new.target属性', () => {});
describe('10. Mixin模式的实现', () => {});










