/**
 * todo: Proxy
 * ref: http://es6.ruanyifeng.com/#docs/proxy
 * Created by wind on 17/5/17.
 * command: mocha src/chapter12.test.js --compilers js:babel-core/register
 */
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import os from 'os';

describe('1. 概述', function(){
  it('(1) 为空对象架设了一层拦截', function() {
    let obj = new Proxy({}, {
      get: function(target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
      },
      set : function(target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
      }
    });

    obj.count = 1;
    ++obj.count;
  });

  it('(2) 拦截读取属性行为的例子', function(){
    let proxy = new Proxy({}, {
      get(target, property) {
        return 35;
      }
    });

    proxy.time = 1;
    let val1 = proxy.time;
    let val2 = proxy.count;

    expect(val1).to.equal(35);
    expect(val2).to.equal(35);
  });

  it('(3) 如果handler没有设置任何拦截，那就等同于直接通向原对象。', function(){
    let target = {};
    let handler = {};
    let proxy = new Proxy(target, handler);

    proxy.b = 'b';

    expect(target.b).to.equal('b');
  });

  it('(4) Proxy 实例可以作为其他对象的原型对象。', function(){
    let proxy = new Proxy({}, {
      get(target, property) {
        return 35;
      }
    });

    let obj = Object.create(proxy);

    expect(obj.time).to.equal(35);
  });

  it('(5) 同一个拦截器函数，可以设置拦截多个操作。', function() {
    let handler = {
      get(target, name) {
        if(name === 'prototype') {
          return Object.prototype;
        }
        return 'Hello, ' + name;
      },

      apply(target, thisBinding, args) {
        console.log(`调用了apply方法,参数是:[${args.join(',')}]`);
        return args[0];
      },

      construct(target, args) {
        console.log(`调用了construct方法,参数是:[${args.join(',')}]`);
        return { value : args[1]};
      }
    };

    let fproxy = new Proxy( (x, y) => x + y, handler);

    expect(fproxy(1,2)).to.equal(1);
    expect(new fproxy(3,4)).to.deep.equal({value : 4});
    expect(fproxy.prototype).to.deep.equal(Object.prototype);
    expect(fproxy.name).to.equal('Hello, name');
  });

  it('(6) Proxy支持的拦截操作一览', function(){
    let handler = {
      get(target, propKey, receiver) {
        console.log(`调用了get方法,参数是:[${propKey}]`);
        return target[propKey] || undefined;
      },
      set(target, propKey, value, receiver) {
        console.log(`调用了set方法,参数是:[${[propKey, value].join(',')}], set 方法需要返回一个bool值`);
        return target[propKey] = value;
      },
      has(target, propKey) {
        console.log(`调用了has方法,参数是:[${propKey}]`);
        return propKey in target;
      },
      deleteProperty(target, propKey) {
        console.log(`调用了deleteProperty方法,参数是:[${propKey}]`);
        return delete target[propKey];
      },
      ownKeys(target) {
        console.log(`调用了ownKeys方法,参数是:[${target}]`);
        return Object.keys(target);
      },
      getOwnPropertyDescriptor(target, propKey) {
        console.log(`调用了getOwnPropertyDescriptor方法,参数是:[${propKey}]`);
        return Object.getOwnPropertyDescriptor(target, propKey);
      },
      defineProperty(target, propKey, propDesc) {
        console.log(`调用了defineProperty方法,参数是:[${[...arguments].join(',')}]`);
        return Object.assign(target, propKey, propDesc);
      },
      preventExtensions(target) {
        console.log(`调用了preventExtensions方法,参数是:[${[...arguments].join(',')}]`);
        return Object.preventExtensions(target);
      },
      isExtensible(target) {
        console.log(`调用了isExtensible方法,参数是:[${[...arguments].join(',')}]`);
        return Object.isExtensible(target);
      },
      getPrototypeOf(target) {
        console.log(`调用了getPrototypeOf方法,参数是:[${[...arguments].join(',')}]`);
        return Object.getPrototypeOf(target);
      },
      setPrototypeOf(target, proto) {
        console.log(`调用了setPrototypeOf方法,参数是:[${[...arguments].join(',')}]`);
        return Object.setPrototypeOf(target, proto);
      },
      apply(target, object, args) {
        console.log(`调用了apply方法,参数是:[${args.join(',')}]`);
        return target(...args);
      },
      construct(target, args) {
        console.log(`调用了construct方法,参数是:[${args.join(',')}]`);
        let obj = new target(...args);
        Object.assign(obj, {
          first: args[0],
          second: args[1]
        });

        return obj;
      }
    };

    let proxy = new Proxy( (x, y) => x + y, handler );
    // apply 的代理
    expect(proxy(1,2)).to.equal(3);
    // construct的代理
    let proxy2 = new proxy(3,4);
    expect(proxy2.first).to.equal(3);
    expect(proxy2.second).to.equal(4);
    // set代理
    proxy.title = 'hello';
    // get代理
    expect(proxy.title).to.equal('hello');
    expect(proxy.name).to.equal(undefined);
    // has代理
    expect('second' in proxy).to.equal(false);
    expect('first' in proxy2).to.equal(true);
    // deleteProperty代理
    expect(delete proxy['title']).to.equal(true);
    // 对象方面的测试
    let proxy3 = new Proxy({'name': 'wind', 'age': 27}, handler);
    // ownKeys代理
    expect(Object.keys(proxy3)).to.deep.equal(['name','age']);
    // defineProperty代理
    Object.defineProperty(proxy3, 'weight', {
      value: `i don't want to tell you.`
    });
    // setPrototypeOf代理
    Object.setPrototypeOf(proxy3, {
      _haha_ : 'haha',
      _lala_: 'lala'
    });
    // getPrototypeOf代理
    expect(Object.getPrototypeOf(proxy3)).to.deep.equal({
      _haha_: 'haha',
      _lala_ : 'lala'
    });
    // preventExtensions代理
    Object.preventExtensions(proxy3);
    // isExtensible代理
    expect(Object.isExtensible(proxy3)).to.equal(false);
  });

});

describe('2. Proxy 实例的方法', () => {
  it('(1) get()', () => {
    let person = { name :'张三' };
    let proxy = new Proxy(person, {
      get(target, property) {
        if(property in target) {
          return target[property];
        } else {
          throw new ReferenceError(`Property "${property}" does not exist.`);
        }
      }
    });
    expect(proxy.name).to.equal('张三');
    try {
      let age = proxy.age;
    }catch (e) {
      expect(e.name).to.equal('ReferenceError');
      expect(e.message).to.equal('Property "age" does not exist.');
    }
  });

  it('(2) get 方法继承', () => {
    let proto = new Proxy({}, {
      get(target, propertyKey, receiver) {
        console.log(`GET ${propertyKey}`);
        return target[propertyKey] || undefined;
      }
    });

    let obj = Object.create(proto);
    expect(obj.xxx).to.equal(undefined);
  });

  it('(3) 使用get拦截，实现数组读取负数的索引。', () => {
    let createArray = (...elements) => {
      let handler = {
        get(target, propKey, receiver) {
          let index = Number(propKey);
          if(index < 0) {
            propKey = String(target.length + index);
          }
          return Reflect.get(target, propKey, receiver);
        }
      };

      let target = [];
      target.push(...elements);
      return new Proxy(target, handler);
    };

    let array = createArray('a','b','c');

    expect(array[-1]).to.equal('c');
  });

  it('(4) 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。', () => {

    let Context = {
      double: n => n * 2,
      pow:  n => n * n,
      reverseInt: n => n.toString().split("").reverse().join('') | 0
    };

    let pipe = (() => {
      return (value) => {
        let funcStack = [];
        let oproxy = new Proxy({}, {
          get(pipeObject, fnName) {
            if(fnName === 'get') {
              return funcStack.reduce( (val, fn) => fn(val), value);
            }
            funcStack.push(Context[fnName]);   // 原文中以window作为上下文，此处以context代替
            return oproxy;
          }
        });

        return oproxy;
      };
    })();

    let lastVal = pipe(3).double.pow.reverseInt.get;
    expect(lastVal).to.equal(63);
  });

  it('(5) 利用get拦截，实现一个生成各种DOM节点的通用函数dom。', () => {

    const { window } = new JSDOM(`...`);
    const { document } = window;

    const dom  = new Proxy({}, {
      get(target, property) {
        return (attrs = {}, ...children) => {
          const el = document.createElement(property);
          for( let prop of Object.keys(attrs) ) {
            el.setAttribute(prop, attrs[prop]);
          }

          for( let child of children) {
            if( typeof child === 'string') {
              child = document.createTextNode(child);
            }
            el.appendChild(child);
          }

          return el;
        }
      }
    });

    const el = dom.div({},
      'Hello, my name is ',
      dom.a({ href : '//example.com' }, 'Mark'),
      '. I like: ',
      dom.ul({},
        dom.li({}, 'The Web'),
        dom.li({}, 'Food'),
        dom.li({}, `...actually that's it`)
      )
    );

    console.log(el.innerHTML);
  });

  it('(6) 如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错', () => {
    const target = Object.defineProperties({}, {
      foo: {
        value: 123,
        writable: false,
        configurable: false
      }
    });

    const handler = {
      get(target, propKey) {
        console.log(`代理get方法被调用,参数是${propKey}, 原值为${target[propKey]},代理值为:abc`);
        return 'abc';
      }
    };

    const proxy = new Proxy(target, handler);

    try {
      proxy.foo;
    } catch(e) {
      expect(e.name).to.equal('TypeError');
      console.log(e.message);
    }
  });

  it('(7) 假定Person对象有一个age属性，该属性应该是一个不大于200的整数，那么可以使用Proxy保证age的属性值符合要求。', () => {
    let validator = {
      set(obj, prop, value) {
        if(prop === 'age') {
          if(!Number.isInteger(value)) {
            throw new TypeError('The age is not an integer');
          }

          if(value > 200) {
            throw new RangeError('The ages seems invalid');
          }
        }
        return obj[prop] = value;
      }
    };

    // 测试
    let person = new Proxy({}, validator);

    console.log(`设置年纪为100`);
    person.age = 100;

    console.log(`设置年纪为字符串"xxxx"`);

    try {
      person.age = 'xxxx';
    }catch(e) {
      expect(e.name).to.equal('TypeError');
      expect(e.message).to.equal('The age is not an integer');
    }

    console.log(`设置年纪为201`);

    try {
      person.age = 201;
    }catch(e) {
      expect(e.name).to.equal('RangeError');
      expect(e.message).to.equal('The ages seems invalid');
    }
  });

  it('(8) 利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。', () => {
    console.log('可以考察下redux的数据绑定。');
  });

  it('(9) 结合get和set方法，就可以做到防止这些内部属性被外部读写。', () => {
    let invariant = (key, action) => {
      if(key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
      }
    };

    let handler = {
      get (target, key) {
        invariant(key, 'get');
        return target[key];
      },
      set (target, key, value) {
        invariant(key, 'set');
        target[key] = value;
        return true;
      }
    };

    let target = {};
    let proxy = new Proxy(target, handler);
    // 尝试读取私有属性_prop
    try {
      proxy._prop;
    }catch(e){
      expect(e.name).to.equal('Error');
      expect(e.message).to.equal('Invalid attempt to get private "_prop" property');
    }

    // 尝试设置私有属性_prop
    try {
      proxy._prop = 'c';
    }catch(e){
      expect(e.name).to.equal('Error');
      expect(e.message).to.equal('Invalid attempt to set private "_prop" property');
    }
    console.log('如果目标对象自身的某个属性，不可写也不可配置，那么set不得改变这个属性的值，只能返回同样的值，否则报错。');
  });

  it('(10) apply方法拦截函数的调用、call和apply操作。', () => {
    let target = () => 'I am the target';
    let handle = {
      apply() {
        return 'I am the proxy';
      }
    };

    let p = new Proxy(target, handle);

    expect(p()).to.equal('I am the proxy');
  });

});

describe('3. Proxy.revocable()', () => {
 it('(1) Proxy.revocable方法返回一个可取消的 Proxy 实例。', () => {
   let target = {};
   let handler = {};

   let { proxy, revoke } = Proxy.revocable(target, handler);

   // 正常访问属性
   proxy.foo = 123;
   console.log(`正常访问属性foo,值为: ${proxy.foo}`);

   // 取消代理
   revoke();

   try {
     console.log(proxy.foo);
   }catch (e) {
     console.log(`删除代理之后访问:${e.name}: ${e.message}`);
     expect(e.name).to.equal('TypeError');
     expect(e.message).to.equal(`Cannot perform 'get' on a proxy that has been revoked`);
   }
 });
});

describe('4. this问题', function(){
  it('(1) 在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。', () => {
    const target = {
      m() {
        return (this === proxy);
      }
    };

    const handler = {};

    const proxy = new Proxy(target, handler);

    expect(target.m()).to.equal(false);
    expect(proxy.m()).to.equal(true);
  });

  it('(2) 下面是一个例子，由于this指向的变化，导致 Proxy 无法代理目标对象。', () => {
    const _name = new WeakMap();

    class Person {
      constructor(name) {
        _name.set(this, name);
      }

      get name() {
        return _name.get(this);
      }
    }

    const jane = new Person('Jane');

    console.log(`不通过代理访问原对象的属性[name],值为${jane.name}`);

    const proxy = new Proxy(jane, {});

    console.log(`通过代理访问原对象的属性[name],值为${proxy.name}`);
    expect(proxy.name).to.equal(undefined);
  });

  it('(3) 有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。', () => {
    const target = new Date();
    const handler = {};
    const proxy = new Proxy(target, handler);

    try {
      proxy.getDate();
    }catch(e) {
      expect(e.name).to.equal('TypeError');
      expect(e.message).to.equal('this is not a Date object.');
    }
  });

  it('(4)this绑定原始对象，就可以解决【原生对象的内部属性，只有通过正确的this才能拿到】的问题', () => {
    let target = new Date('2017-05-19');
    const handler = {
      get(target, prop) {
        if(prop === 'getDate'){
          return target.getDate.bind(target);
        }

        return Reflect.get(target, prop);
      }
    };

    const proxy = new Proxy(target, handler);

    expect(proxy.getDate()).to.equal(19);
  });
});

describe('5. 实例: Web服务的客户端', function(){
  it('(1) Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。', () => {});
});

