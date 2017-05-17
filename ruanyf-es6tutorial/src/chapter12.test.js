/**
 * todo: Proxy
 * ref: http://es6.ruanyifeng.com/#docs/proxy
 * Created by wind on 17/5/17.
 * command: mocha src/chapter12.test.js --compilers js:babel-core/register
 */
import expect from 'chai';

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

});

describe('2. Proxy 实例的方法', function(){});
describe('3. Proxy.revocable()', function(){});
describe('4. this问题', function(){});
describe('5. 实例: Web服务的客户端', function(){});

