/**
 * todo: Proxy
 * ref: http://es6.ruanyifeng.com/#docs/proxy
 * Created by wind on 17/5/17.
 * command: mocha src/chapter12.test.js --compilers js:babel-core/register
 */
import { expect } from 'chai';

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
});
describe('3. Proxy.revocable()', function(){});
describe('4. this问题', function(){});
describe('5. 实例: Web服务的客户端', function(){});

