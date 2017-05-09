/**
 * todo: Set和Map数据结构
 * ref: http://es6.ruanyifeng.com/#docs/set-map
 * Created by wind on 17/5/9.
 */
import { expect } from 'chai';

describe('1. Set', function(){
  it('(1) 它类似于数组，但是成员的值都是唯一的，没有重复的值。', function(){
    const s = new Set();
    [2,3,5,4,5,2,2].forEach(x => s.add(x));
    expect([...s]).to.deep.equal([2,3,5,4]);
  });

  it('(2) 去除数组重复元素的方法。注意object === object 的条件必须是指向同一内存区域', function(){
    let object = {name: 'test', title:'title1'};
    let array = [object, object];
    let arr2 = [... new Set(array)];
    expect(arr2).to.deep.equal([object]);
  });

  it('(3) Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）=> {add, delete, has, clear}', function(){
    let s = new Set();
    s.add(1).add(2).add(2);
    expect(s.size).to.equal(2);
    expect([...s]).to.deep.equal([1,2]);

    expect(s.has(1)).to.equal(true);
    expect(s.has(2)).to.equal(true);
    expect(s.has(3)).to.equal(false);

    s.delete(2);
    expect(s.has(2)).to.equal(false);
  });

  it('(4) Array.from方法可以将 Set 结构转为数组。', function(){
    const items = new Set([1,2,3,4,5]);
    const arr1 = Array.from(items);
    const arr2 = [...items];
    expect(arr2).to.deep.equal(arr1);
  });

  it('(5) keys方法、values方法、entries方法返回的都是遍历器对象.Set 结构没有键名，只有键值', function(){
    let set  = new Set(['red', 'green', 'blue']),
        keys = set.keys(),
        values = set.values(),
        entries = set.entries();
    expect(keys).to.deep.equal(values);
    for(let item of entries) {
      console.log(item);
    }
  });

  it('(6) forEach()', function(){
    let set  = new Set([1, 2, 3]),
        arr  = [];
    set.forEach( (val, key) => arr.push(val) ) ;
    expect(arr).to.deep.equal([1,2,3]);
  });
  it('(7) 遍历的应用: 求并集', function(){
    let a = new Set([1,2,3]);
    let b = new Set([4,3,2]);

    let union = new Set([...a,...b]);

    expect([...union]).to.deep.equal([1,2,3,4]);
  });

  it('(8) 遍历的应用: 求交集', function(){
    let a = new Set([1,2,3]);
    let b = new Set([4,3,2]);

    let intersect = new Set([...a].filter( x=> b.has(x) ) );

    expect([...intersect]).to.deep.equal([2,3]);
  });

  it('(9) 遍历的应用: 求差集', function(){
    let a = new Set([1,2,3]);
    let b = new Set([4,3,2]);

    let difference = new Set([...a].filter( x=> !b.has(x) ) );

    expect([...difference]).to.deep.equal([1]);
  });

  it('(10) 遍历操作中，同步改变原来的 Set 结构', function(){
    let set  = new Set([1,2,3]);
    let set1 = new Set([...set].map( val => val*2 ));
    expect([...set1]).to.deep.equal([2,4,6]);
  });
});
describe('2. WeakSet', function(){
  it('(1) WeakSet 的成员只能是对象，而不能是其他类型的值。', function(){
    const ws= new WeakSet();
    try {
      ws.add(1);
    }catch (e){
      expect(e.name).to.equal('TypeError');
      expect(e.message).to.equal('Invalid value used in weak set');
    }
  });

  it('(2) add(value),delete(value),has(value)', function(){
    const ws = new WeakSet();
    const obj = {};
    const foo = {};

    ws.add(obj);
    ws.add(foo);
    expect(ws.has(obj)).to.equal(true);
    expect(ws.has(foo)).to.equal(true);
    ws.delete(foo);
    expect(ws.has(foo)).to.equal(false);
  });

  it('(3) WeakSet没有size属性，没有办法遍历它的成员。', function(){
    const ws = new WeakSet();
    ws.add({});
    expect(ws.size).to.equal(undefined);
  });

  it('(4) 使用WeakSet确保实例方法的调用', function(){
    const foos = new WeakSet();

    class Foo {
      constructor() {
        foos.add(this);
      }
      method() {
        if(!foos.has(this)){
          throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用!');
        }else {
          return 'called';
        }
      }
    }

    let a = new Foo();
    expect(a.method()).to.equal('called');

    try {
      let b = new Foo();
      // 从foos中删除b,模拟实例销毁
      foos.delete(b);
      b.method();
    }catch(e){
      expect(e.name).to.equal('TypeError');
      expect(e.message).to.equal('Foo.prototype.method 只能在Foo的实例上调用!');
    }
  });
});
describe('3. Map', function(){});
describe('1. WeakMap', function(){});
