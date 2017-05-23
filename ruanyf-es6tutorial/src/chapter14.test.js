/**
 * todo: Promise 对象
 * ref: http://es6.ruanyifeng.com/#docs/promise
 * command: mocha src/chapter14.test.js --compilers js:babel-core/register
 * Created by wind on 17/5/23.
 */
import { expect } from 'chai';
import { startServer } from '../components/server';
import { XMLHttpRequest } from 'xmlhttprequest';

describe('1.基本用法', () => {

  let stopServer = null;

  before(done => {
    startServer(62351, function (stop) {
      stopServer = stop;
      done();
    });
  });

  after(done => {
    stopServer(done);
  });

  it('(1) 一个简单的例子', () => {
    function timeout(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve(ms), ms, 'done');
      });
    }
    console.log('开始异步执行:');
    timeout(100).then( (val) => {
      console.log(`异步执行结束,输出定时器的定时:[${val}]`);
    });
  });

  it('(2) Promise 新建之后会离职执行', () => {
    let promise = new Promise((resolve, reject) => {
      console.log('Promise');
      resolve();
    });

    promise.then(() => {
      console.log('Resolved.');
    });

    console.log('Hi!');
  });

  it('(3) 使用Promise对象实现Ajax操作的例子', () => {
    function getJSON(url) {
      let promise = new Promise(function(resolve, reject){
        // 定义处理方法
        function handler() {
          if(this.readyState !== 4) {
            return ;
          }
          if(this.status === 200) {
            resolve(this.responseText);
          } else {
            reject(new Error(this.statusText));
          }
        }

        let client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader('Accept', 'application/json');
        client.send();
      });

      return promise;
    }

    getJSON('http://127.0.0.1:62351/api/book.json').then( json => {
      console.log('Contents: ' + json);
    }, error => {
      console.error('出错了!',error);
    });
  });
});
describe('2.Promise.prototype.then()', () => { });
describe('3.Promise.prototype.catch()', () => { });
describe('4.Promise.all()', () => { });
describe('5.Promise.race()', () => { });
describe('6.Promise.resolve()', () => { });
describe('7.Promise.reject()', () => { });
describe('8.两个有用的附加方法', () => { });
describe('9.应用', () => { });
describe('10.Promise.try()', () => { });










