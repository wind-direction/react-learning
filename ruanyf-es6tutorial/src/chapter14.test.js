/**
 * todo: Promise 对象
 * ref: http://es6.ruanyifeng.com/#docs/promise
 * command: mocha src/chapter14.test.js --compilers js:babel-core/register
 * Created by wind on 17/5/23.
 */
import { expect } from 'chai';
import { startServer } from '../components/server';
import { XMLHttpRequest } from 'xmlhttprequest';

const HOST = '127.0.0.1';
const PORT = 62351;
const API_GROUP = 'api';
const BASE_URL = `http://${HOST}:${PORT}`;

describe('1.基本用法', () => {

  let stopServer = null;

  before(done => {
    startServer(PORT, function (stop) {
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

    // 异步获取数据
    getJSON(`${BASE_URL}/${API_GROUP}/book.json`).then( responseText => {
      let info = JSON.parse(responseText);
      console.log(`《${info.title}》作者:${info.author.join(' ')}, 单价:${info.price}`);
      expect(info.id).to.equal('1220562');
    }, error => {
      console.error('出错了!',error);
    });
  });

  it('(4) resolve函数的参数除了正常的值以外，还可能是另一个Promise实例', () => {
    let p1 = new Promise((resolve, reject) => {
      setTimeout( () => reject( new Error('fail')), 3000 );
    });

    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(p1), 1000);
    });

    p2.then(result => console.log(result))
      .catch(error => {
        expect(error.message).to.equal('fail');
      });
  });

});
describe('2.Promise.prototype.then()', () => {

});
describe('3.Promise.prototype.catch()', () => { });
describe('4.Promise.all()', () => { });
describe('5.Promise.race()', () => { });
describe('6.Promise.resolve()', () => { });
describe('7.Promise.reject()', () => { });
describe('8.两个有用的附加方法', () => { });
describe('9.应用', () => { });
describe('10.Promise.try()', () => { });










