/**
 * todo: Symbol
 * ref: http://es6.ruanyifeng.com/#docs/symbol
 * Created by wind on 17/5/8.
 */
import { expect } from 'chai';

describe('1. 概述', function(){
  it('(1) ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值', function(){
    let s = Symbol();
    expect(typeof s).to.equal('symbol');
  });
  it('(2) Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。', function(){
    let s1 = Symbol('foo'),
        s2 = Symbol('baz');
    expect(s1.toString()).to.equal('Symbol(foo)');
    expect(s2.toString()).to.equal('Symbol(baz)');
  });
  it('(3) 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。', function(){
    let obj = {
      toString() {
        return 'test';
      }
    };

    const sym = Symbol(obj);
    expect(sym.toString()).to.equal('Symbol(test)');
  });
});
describe('2. 作为属性名的Symbol', function(){
  it('(1) Symbol 值作为对象属性名时，不能用点运算符。', function(){
    let mySymbol = Symbol();
    let a = {};
    a.mySymbol = 'Hello';
    expect(a[mySymbol]).to.equal(undefined);
    expect(a['mySymbol']).to.equal('Hello');
    // 真正赋值
    a[mySymbol] = 'Hello world';
    expect(a[mySymbol]).to.equal('Hello world');
  });

  it('(2) 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。', function(){
    let s = Symbol();
    let obj = {
      [s]: args => args+1
    };
    expect(obj[s](123)).to.equal(124);
  });
});

describe('4. 属性名的遍历', function(){
  it('(1) Object.getOwnPropertySymbols()获取所有的Symbol的属性名', function(){
    let obj = {};
    let foo = Symbol('foo');
    Object.defineProperty(obj, foo, {value: 'invisible'});
    obj.title = 'visible';
    expect(Object.keys(obj)).to.deep.equal(['title']);
    expect(Object.getOwnPropertySymbols(obj)).to.deep.equal([foo]);
  });
  it('(2) Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。', function(){
    let foo = Symbol('foo'),
        obj = {
          [foo]: 1,
          enum: 2,
          nonEnum: 3
        };
    expect(Reflect.ownKeys(obj)).to.deep.equal(['enum','nonEnum',foo]);
  });
  it('(3) Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法', function(){
    let size = Symbol('size');

    class Collection {
      constructor(){
        this[size] = 0;
      }
      add(item) {
        this[this[size]] = item;
        this[size]++;
      }

      static sizeOf(instance) {
        return instance[size];
      }
    }

    let x = new Collection();
    expect(Collection.sizeOf(x)).to.equal(0);

    x.add('foo');
    expect(Collection.sizeOf(x)).to.equal(1);

    x.add('time');
    expect(Object.keys(x)).to.deep.equal(['0','1']);
    expect(Object.getOwnPropertyNames(x)).to.deep.equal(['0','1']);
    expect(Object.getOwnPropertySymbols(x)).to.deep.equal([size]);
  });
});
describe('5. Symbol.for(), Symbol.keyFor()', function(){
  it('(1) Symbol.for方法接受一个字符串,然后搜索有没有以该参数作为名称的Symbol值。有?返回这个Symbol值:就返回一个以该字符串为名称的Symbol值。', function(){
    let a = Symbol.for('foo'),
        b = Symbol.for('foo'),
        c = Symbol('foo');
    expect(a).to.equal(b);
    expect(a).to.not.equal(c);
  });
});
describe('6. 实例：模块的Singleton', function(){});
describe('7. 内置的Symbol值', function(){
  it('(1) 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。', function(){
    class MyClass {
      [Symbol.hasInstance](foo) {
        return foo instanceof Array;
      }
    }

    let flag = [1,2,3] instanceof new MyClass();
    expect(flag).to.equal(true);
  });

  it('(2) 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象使用Array.prototype.concat()时，是否可以展开。', function(){
    let arr1 = ['c','d'];
    ['a','b'].concat(arr1, 'e');
    expect(arr1[Symbol.isConcatSpreadable]).to.equal(undefined);

    let arr2 = ['c','d'];
    arr2[Symbol.isConcatSpreadable] = false;
    let c = ['a','b'].concat(arr2, 'e');
    expect(c).to.deep.equal(['a','b',['c','d'], 'e']);
  });
});
