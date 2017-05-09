/**
 * todo: Set和Map数据结构
 * ref: http://es6.ruanyifeng.com/#docs/set-map
 * Created by wind on 17/5/9.
 * command: mocha src/chapter11.test.js --compilers js:babel-core/register -gc
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
describe('3. Map', function(){
  it('(1) Map结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。', function(){
    const m = new Map();
    const o = {p : 'Hello World'};

    m.set(o, 'content');
    expect(m.get(o)).to.equal('content');
  });

  it('(2) set,get,has,delete', function(){
    const m = new Map();
    const o = {p : 'Hello world'};
    m.set(o, 'content');
    expect(m.has(o)).to.equal(true);
    m.delete(o);
    expect(m.has(o)).to.equal(false);
  });

  it('(3) 作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。', function(){
    let map = new Map([
      ['name','张三'],
      ['title', 'Author']
    ]);

    expect(map.size).to.equal(2);
    expect(map.has('name')).to.equal(true);
    expect(map.get('name')).to.equal('张三');
    expect(map.has('title')).to.equal(true);
    expect(map.get('title')).to.equal('Author');
  });

  it('(4) Set和Map都可以用来生成新的 Map。', function(){
    const set = new Set([
      ['foo', 1],
      ['bar', 2]
    ]);

    const m1 = new Map(set);
    expect(m1.get('foo')).to.equal(1);

    const m2 = new Map([['baz', 3]]);
    const m3 = new Map(m2);

    expect(m3.get('baz')).to.equal(3);
  });

  it('(5) 如果对同一个键多次赋值，后面的值将覆盖前面的值。', function(){
    const map = new Map();

    map.set('foo', 'test1').set('foo','test2');
    expect(map.get('foo')).to.equal('test2');
  });

  it('(6) 只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。', function(){
    const map = new Map();
    map.set(['a'], 555);
    expect(map.get(['a'])).to.not.equal(555);
  });

  it('(7) Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。', function(){
    const map = new Map();
    const k1 = ['a'];
    const k2 = ['b'];

    map.set(k1, 111).set(k2,222);
    expect(map.get(k1)).to.equal(111);
    expect(map.get(k2)).to.equal(222);
  });

  it('(8) clear() 方法清除所有的成员，没有返回值。', function(){
    let map = new Map();
    map.set('foo',true);
    map.set('bar',false);
    expect(map.size).to.equal(2);
    map.clear();
    expect(map.size).to.equal(0);
  });

  it('(9) keys(), values(), forEach(), entries()', function(){
    let map = new Map([
      ['F','no'],
      ['T','yes']
    ]);

    expect([...map.keys()]).to.deep.equal(['F','T']);
    expect([...map.values()]).to.deep.equal(['no','yes']);

    let arr = [];
    map.forEach((val, key) => arr.push(`key:${key},value:${val}`) );
    expect(arr).to.deep.equal([ 'key:F,value:no', 'key:T,value:yes' ]);

    expect([...map.entries()]).to.deep.equal([ ['F','no'], ['T','yes'] ]);
  });

  it('(10) forEach方法还可以接受第二个参数，用来绑定this。', function(){
    const reporter = {
      report(key, value) {
        return `key:${key},value:${value}`;
      }
    };

    const map = new Map([
      ['foo', 'test1'],
      ['baz', 'test2']
    ]);

    let arr = [];
    map.forEach( function(val, key) {
      let item = this.report(key, val);
      arr.push(item);
    }, reporter);

    expect(arr).to.deep.equal([ 'key:foo,value:test1','key:baz,value:test2' ]);
  });
});
describe('4. WeakMap', function(){
  it('(1) WeakMap结构与Map结构类似，也是用于生成键值对。', function(){
    const wm1 = new WeakMap();
    const key = {foo: 1};
    wm1.set(key, 2);
    expect(wm1.get(key)).to.equal(2) ;

    const k1 = [1, 2, 3];
    const k2 = [4, 5, 6];
    const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
    expect(wm2.get(k2)).to.equal('bar') ;
  });

  it('(2) WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。', function(){
    const map = new WeakMap();
    try {
      map.set(1, 2);
    }catch (e) {
      expect(e.name).to.equal('TypeError');
      expect(e.message).to.equal('Invalid value used as weak map key');
    }
  });

  it('(3) WeakMap的键名所指向的对象，不计入垃圾回收机制。注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。', function(){
    const wm = new WeakMap();
    let key = {};
    let obj = {foo : 1};

    wm.set(key, obj);

    obj = null;
    expect(wm.get(key)).to.deep.equal({foo: 1});
  });

  it('(4) 垃圾回收的测试', function(){
    let turnToBin = function(val){
      if(typeof val === 'number'){
        let _val_ = parseInt(val);
        if(_val_ >= 1024){
          if(_val_ >= 1048576){                    //1024*1024
            if(_val_>= 1073741824){              //1024*1024*1024
              if(_val_>= 1099511627776) return parseFloat(_val_/1099511627776).toFixed(2) + "TB";
              else  return parseFloat(_val_/1073741824).toFixed(2) + "GB";
            }else  return parseFloat(_val_/1048576).toFixed(2) + "MB";
          }else  return parseFloat(_val_/1024).toFixed(2) + "KB";
        }else return _val_+"B";
      }else {
        return val;
      }
    };

    let formatMem = (obj) => {
      let spaceArr = '                    ',  // 20个空白字符
          titleStr = spaceArr.substr(0,(20 - obj.title.length)) + obj.title,
          rss = turnToBin(obj.rss),
          rssStr = spaceArr.substr(0,(20 - rss.length)) + rss,
          heapTotal = turnToBin(obj.heapTotal),
          heapTotalStr = spaceArr.substr(0,(20 - heapTotal.length)) + heapTotal,
          heapUsed = turnToBin(obj.heapUsed),
          heapUsedStr = spaceArr.substr(0,(20 - heapUsed.length)) + heapUsed,
          external = turnToBin(obj.external),
          externalStr = spaceArr.substr(0,(20 - external.length)) + external;
      return `|${titleStr}|${rssStr}|${heapTotalStr}|${heapUsedStr}|${externalStr}|`;
    };



    global.gc();
    let memory = process.memoryUsage();
    memory.title = 'begin';
    let wm = new WeakMap();
    let b = new Object();

    global.gc();

    let memory1 = process.memoryUsage();
    memory1.title = 'create obj';

    wm.set(b, new Array(5*1024*1024));

    global.gc();

    let memory2 = process.memoryUsage();
    memory2.title = 'Array(5*1024*1024)';

    // 解除b；
    b = null;
    global.gc();
    let memory3 = process.memoryUsage();
    memory3.title = 'b= null';
    let header = {
      title: 'header',
      rss: 'rss',
      heapTotal:'heapTotal',
      heapUsed:'heapUsed',
      external:'external'
    };

    [header,memory, memory1, memory2, memory3].forEach((item)=>{
      console.log(formatMem(item));
    });
  });
});
