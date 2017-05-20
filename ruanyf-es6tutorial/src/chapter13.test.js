/**
 * todo: Reflect
 * ref: http://es6.ruanyifeng.com/#docs/reflect
 * Created by wind on 17/5/19.
 * command: mocha src/chapter13.test.js --compilers js:babel-core/register
 */

import { expect } from 'chai';

describe('1. 概述', () => {
  it('(1) 让Object操作都变成函数行为', () => {
    expect('assign' in Object).to.equal(true);
    expect(Reflect.has(Object, 'assign')).to.equal(true);
  });

  it('(2) Reflect对象的方法与Proxy对象的方法一一对应， 不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。', () => {
    let target = {};
    let proxy = new Proxy(target, {
      set(target,name, value, receiver) {
        let success = Reflect.set(target, name, value, receiver);
        if(success){
          console.log(`property ${name} on ${target} set to ${value}`);
        }

        return success;
      }
    });

    proxy.title = "test";
  });

  it('(3) 拦截操作（get、delete、has），并将每一个操作输出一行日志。', () => {
    let obj = {};
    let loggedObj = new Proxy(obj, {
      get(target, name) {
        console.log('get', target, name);
        return Reflect.get(target, name);
      },
      deleteProperty(target, name) {
        console.log('delete '+ name);
        return Reflect.deleteProperty(target, name);
      },
      has(target, name){
        console.log('has ' + name);
        return Reflect.has(target, name);
      }
    });

    loggedObj.title = 'xxxxxxx';
    expect(loggedObj.title).to.equal('xxxxxxx');
    expect('title' in loggedObj).to.equal(true);
    delete loggedObj['title'];
  });
});

describe('2. 静态方法', () => {
  it('(1) Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。', () =>{
    let myObject = {
      foo: 1,
      bar: 2,
      get baz() {
        return this.foo + this.bar;
      }
    };

    expect(Reflect.get(myObject, 'foo')).to.equal(1);
    expect(Reflect.get(myObject, 'bar')).to.equal(2);
    expect(Reflect.get(myObject, 'baz')).to.equal(3);
  });

  it('(2) 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。', () =>{
    let myObject = {
      foo: 1,
      bar: 2,
      get baz() {
        return this.foo + this.bar;
      }
    };

    let myReceiverObject = {
      foo: 4,
      bar: 4
    };

    expect(Reflect.get(myObject, 'baz', myReceiverObject)).to.equal(8);
  });

  it('(3) 如果第一个参数不是对象，Reflect.get方法会报错', () => {
    try {
      Reflect.get(1, 'foo');
    } catch(e) {
      expect(e.name).to.equal('TypeError');
      expect(e.message).to.equal('Reflect.get called on non-object');
    }
  });

  it('(4) Reflect.set方法设置target对象的name属性等于value。', () => {
    let myObject = {
      foo: 1,
      set bar(value) {
        return this.foo = value;
      }
    };

    expect(myObject.foo).to.equal(1);

    // 设置
    Reflect.set(myObject, 'foo', 2);

    expect(myObject.foo).to.equal(2);

    // 设置baz

    Reflect.set(myObject, 'bar', 3);
    expect(myObject.foo).to.equal(3);
  });

  it('(5) 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。', () => {
    let myObject = {
      foo: 4,
      set bar(value) {
        return this.foo = value;
      }
    };

    let myReceiverObject = {
      foo: 0
    };

    Reflect.set(myObject, 'bar', 1, myReceiverObject);
    expect(myObject.foo).to.equal(4);
    expect(myReceiverObject.foo).to.equal(1);
  });

  it('(6) 注意，Reflect.set会触发Proxy.defineProperty拦截。', () => {
    let p = {a: 'a'};
    let handler = {
      set(target, name, value, receiver){
        console.log('set');
        return Reflect.set(target, name, value, receiver);
      },
      defineProperty(target, key, attribute){
        console.log('defineProperty');
        return Reflect.defineProperty(target,key, attribute);
      }
    };

    let obj = new Proxy(p, handler);

    obj.a = 'A';
  });

  it('(7) Reflect.has方法对应name in obj里面的in运算符。', () => {
    let myObject = {
      foo: 1
    };

    expect('foo' in myObject).to.equal(true);
    expect(Reflect.has(myObject, 'foo')).to.equal(true);
  });

  it('(8) Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。', () => {
    const myObj = { foo: 'bar', foo2: 'baz' };
    delete myObj.foo;
    expect(Reflect.has(myObj, 'foo')).to.equal(false);
    Reflect.deleteProperty(myObj, 'foo2');
    expect(Reflect.has(myObj,'foo2')).to.equal(false);
  });

  it('(9) Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。', () => {
    let Greeting = function(name){ this.name = name; };

    const instance = new Greeting('张三');

    expect(instance instanceof Greeting).to.equal(true);

    const instance2 = Reflect.construct(Greeting, ['张三']);

    expect(instance2 instanceof Greeting).to.equal(true);
  });

  it('(10) Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。', () => {
    let FancyThing = function(name) { this.name = name;  };

    const myObj = new FancyThing('张三');

    expect(Object.getPrototypeOf(myObj)).to.deep.equal(FancyThing.prototype);
    expect(Reflect.getPrototypeOf(myObj)).to.deep.equal(FancyThing.prototype);
  });

  it('(11) 如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。', () => {
    console.log(Object.getPrototypeOf(1));
    try {
      Reflect.getPrototypeOf(1);
    }catch (e) {
      console.log(`${e.name}: ${e.message}`);
      expect(e.name).to.equal('TypeError');
    }
  });

  it('(12) Reflect.setPrototypeOf方法用于设置对象的__proto__属性，返回第一个参数对象，对应Object.setPrototypeOf(obj, newProto)。', () => {});

  it('(13) Reflect.apply(func, thisArg, args)', () => {});

  it('(14) Reflect.defineProperty(target, propertyKey, attributes)', () => {});

  it('(15) Reflect.getOwnPropertyDescriptor(target, propertyKey) ', () => {});

  it('(16) Reflect.isExtensible (target) ', () => {});

  it('(17) Reflect.preventExtensions(target) ', () => {});

  it('(18) Reflect.ownKeys (target)', () => {});
});

describe('3. 实例：使用Proxy实现观察者模式', () => {
  it('(1) 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。', () => {
    const queuedObservers = new Set();
    const observe = fn => queuedObservers.add(fn);
    const observable = obj => new Proxy(obj, { set });

    function set(target, key, value, receiver) {
      const result = Reflect.set(target,key, value, receiver);
      queuedObservers.forEach(observer => observer() );
      return result;
    }

    const person = observable({
      name: '张三',
      age: 20
    });

    function print() {
      console.log(`${person.name}, ${person.age}`);
    }

    observe(print);

    person.name = '李四';

    observe(() => {
      console.log(`新增一个监听者，监听对象的变化，并输出此时的时间戳:${new Date()}`);
    });

    person.name = '赵五';
  });
});


