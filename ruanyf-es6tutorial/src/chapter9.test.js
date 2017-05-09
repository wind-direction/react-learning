/**
 * todo: 对象的扩展
 * ref: http://es6.ruanyifeng.com/#docs/object
 * Created by wind on 17/5/5.
 * command: mocha src/chapter9.test.js --compilers js:babel-core/register
 */
import { expect } from 'chai';

describe('1. 属性的简洁表示法', function(){
  it('(1) ES6 允许直接写入变量和函数，作为对象的属性和方法。', function(){
    let foo = 'bar';
    let baz = {foo};
    expect(baz).to.deep.equal({foo:'bar'});
  });

  it('(2) let name= "xxx", age=23; let c = {name,age}; 那么c=>{name: "xxx", age: 23}', function(){
    let name = 'xxx',
        age = 23,
        c = {name, age};
    expect(c).to.deep.equal({name: "xxx", age: 23});
  });
});
describe('2. 属性名表达式', function(){
  it('(1) ES6 允许字面量定义对象时，用表达式作为对象的属性名。',function(){
    let propKey = 'foo';
    let obj = {
      [propKey]: true,
      ['sec_' + propKey]: 'secVal'
    };

    expect(obj).to.deep.equal({foo:true, sec_foo: 'secVal'});
  });
  it('(2) 使用表达式定义方法名', function(){
    let obj = {
      ['h' + 'ello']() {
        return 'hi';
      }
    };

    expect(typeof obj.hello).to.equal('function');
  });
});
describe('3. 方法的name属性', function(){
  it('(1) 方法的name属性返回函数名', function(){
    function funcName(){};
    expect(funcName.name).to.equal('funcName');
  });

  it('(2) 对象的方法使用了取值函数（getter）和存值函数（setter）',  function(){
    const obj = {
      get wheel() {},
      set wheel(name){}
    };
    const descriptor = Object.getOwnPropertyDescriptor(obj, 'wheel');
    expect(descriptor.get.name).to.equal('get wheel');
    expect(descriptor.set.name).to.equal('set wheel');
  });

  it('(3) bind方法创造的函数,name返回bound加原函数的名字', function(){
    let doSomething = function(){};
    let nameVal = doSomething.bind().name;
    expect(nameVal).to.equal('bound doSomething');
  });

  it('(4) unction构造函数创造的函数，name属性返回anonymous', function(){
    let nameVal = (new Function()).name; // "anonymous"
    expect(nameVal).to.equal('anonymous');
  });
  it('(5) 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。', function(){
    const key1 = Symbol('description');
    const key2 = Symbol();
    let obj = {
      [key1]() {},
      [key2]() {},
    };
    // expect(obj[key1].name).to.equal('[description]'); // "[description]"
    expect(obj[key2].name).to.equal(''); // ""
  });
});
describe('4. Object.is() 同值相等算法', function(){
  it('(1) +0 === -0 为true', function(){ expect(+0 === -0).to.equal(true); });
  it('(2) NaN === NaN 为false', function(){ expect(NaN === NaN).to.equal(false); });
  it('(3) Object.is(+0, -0) 为false', function(){ expect(Object.is(+0, -0)).to.equal(false); });
  it('(4) Object.is(NaN, NaN) 为true', function(){ expect(Object.is(NaN, NaN)).to.equal(true); });
});

describe('5. Object.assign()', function(){
  it('(1) Object.assign方法用于对象的合并。', function(){
    let target = { a: 1 },
        source1 = { b: 2 },
        source2 = { c: 3 };

    Object.assign(target, source1, source2);
    expect(target).to.deep.equal({a:1, b:2, c:3});
  });
  it('(2) Object.assign方法实行的是浅拷贝，也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。',function(){
    let obj1 = {a: {b: 1}};
    let obj2 = Object.assign({}, obj1);
    expect(obj2.a.b).to.equal(1);
    obj1.a.b = 2;
    expect(obj2.a.b).to.equal(2);

  });
});
describe('6. 属性的可枚举性', function(){
  it('(1) 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。', function(){
    let obj = { foo: 123 };
    let fooProp = Object.getOwnPropertyDescriptor(obj, 'foo');
    expect(fooProp).to.deep.equal({
      value: 123,
      writable: true,
      enumerable: true,
      configurable: true
    });
  });
});
describe('7. 属性的遍历', function(){
  it('(1) Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管属性名是Symbol或字符串，也不管是否可枚举。', function(){
    let arr = Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 });
    console.log(arr);
  });
});
describe('8. __proto__属性，Object.setPrototypeOf(), Object.getPrototypeOf()', function(){
  it('(1) __proto__ 用来读取或设置当前对象的prototype对象', function(){
    var obj = {
      method: function(){},
      name : 'hello'
    };

    console.log(obj.__proto__);
  });

  it('(2) setPrototypeOf()', function(){
    let proto = {};
    let obj = {x: 10};
    Object.setPrototypeOf(obj, proto);

    Object.assign(proto, { y: 20, z: 30 });
    expect(obj.y).to.equal(20);
    expect(obj.z).to.equal(30);
  });

  it('(3) getPrototypeOf()', function(){
    function Rectangle() {}
    let rec = new Rectangle();
    expect(Object.getPrototypeOf(rec)).to.deep.equal(Rectangle.prototype);
    // 变更rec的对象
    let proto = {
      hello : 'test'
    };
    Object.setPrototypeOf(rec, proto);
    expect(Object.getPrototypeOf(rec)).to.not.deep.equal(Rectangle.prototype);
  });
});
describe('9. Object.keys(), object.values(), object.entries()', function(){
  it('(1) Object.keys(): {foo:"bar", baz: 42}=>["foo", "baz"]', function(){
    let obj = {foo: "bar", baz: 42};
    expect(Object.keys(obj)).to.deep.equal(["foo","baz"]);
  });
  it('(2) Object.values(): {foo:"bar", baz: 42}=>["bar", 42]', function(){
    let obj = {foo: "bar", baz: 42};
    expect(Object.values(obj)).to.deep.equal(["bar", 42]);
  });
  it('(3) Object.entries(): {foo:"bar", baz: 42}=>[["foo", "bar"],["baz", 42]]', function(){
    let obj = {foo: "bar", baz: 42};
    expect(Object.entries(obj)).to.deep.equal([["foo", "bar"],["baz", 42]]);
  });
});
describe('10. 对象的扩展运算符', function(){
  it('(1) 解构赋值 let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }, z=>{a:3, b:4}', function(){
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    expect(x).to.equal(1);
    expect(y).to.equal(2);
    expect(z).to.deep.equal({a:3, b:4});
  });

  it('(2) 解构赋值的拷贝是浅拷贝.', function(){
    let obj = {x: 1, y: 2, c: 3, d: { name: 4} },
      {x, y, ...z} = obj;
    expect(x).to.equal(1);
    expect(y).to.equal(2);
    expect(z).to.deep.equal({c:3,  d: { name: 4}});
    obj.d.name = 5;
    expect(z).to.deep.equal({c:3,  d: { name: 5} });
  });

  it('(3) 扩展运算符, {...a, ...b} = Object.assign({}, a, b)', function(){
    let a = {name: 'a', age: 23}, b = {title: 'b', text: 'test b'},
        c = {...a, ...b};
    expect(c).to.deep.equal({name: 'a', age: 23, title: 'b', text: 'test b'});
  });
});

describe('11. Object.getOwnPropertyDescriptors()', function(){
  it('(1) 该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。', function(){
    const source = {
      set foo(value) {
        console.log(value);
      }
    };

    const target1 = {};
    Object.assign(target1, source);
    let target1Des = Object.getOwnPropertyDescriptor(target1, 'foo');
    expect(target1Des).to.deep.equal({
      value: undefined,
      writable: true,
      enumerable: true,
      configurable: true
    });

    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
    let target2Des = Object.getOwnPropertyDescriptor(target2, 'foo');
    console.log(target2Des);
  });

  it('(2) Object.create', function(){
    let a = {title: 'test'};
    let c = {x: 42};
    let b = Object.create(a, Object.getOwnPropertyDescriptors(c));
    console.log(b.__proto__);
  });

  it('(3) 实现Mixin（混入）模式', function(){
    let mix = (object) => ({
      with: (...mixins) => mixins.reduce(
        (c, mixin) => Object.create(
          c, Object.getOwnPropertyDescriptors(mixin)
        ), object)
    });

    let a = {a: 'a'};
    let b = {b: 'b'};
    let c = {c: 'c'};

    let d = mix(c).with(a,b);
    console.log(d.__proto__);
  });
});
