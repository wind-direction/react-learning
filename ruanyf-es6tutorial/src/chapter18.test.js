/**
 * todo: async 函数
 * ref: http://es6.ruanyifeng.com/#docs/async
 * command: mocha src/chapter18.test.js --compilers js:babel-core/register --timeout 10000
 * Created by wind on 17/6/1.
 */
import { expect } from 'chai';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import co from 'co';

const ROOT = path.resolve(__dirname, '../');

describe('1. 含义', () => {
  it('(1) 前文的一个Generator函数，依次读取两个文件', done => {
    let readFile = function(fileName){
      return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8' ,(error, data) => {
          if (error) reject(error);
          resolve(data);
        });
      });
    };

    let gen = function * () {
      let f1 = yield readFile(path.resolve(ROOT, 'api/file1.txt'));
      let f2 = yield readFile(path.resolve(ROOT, 'api/file2.txt'));
      console.log(f1.toString());
      console.log(f2.toString());
    };

    co(gen).then( () => done()).catch(err => done(err));
  });

  it('(2) 写成async函数', done => {
    let readFile = function(fileName){
      return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8' ,(error, data) => {
          if (error) reject(error);
          resolve(data);
        });
      });
    };

    let asyncReadFile = async function () {
      let f1 = await readFile(path.resolve(ROOT, 'api/file1.txt'));
      let f2 = await readFile(path.resolve(ROOT, 'api/file2.txt'));
      console.log(f1.toString());
      console.log(f2.toString());
    };

    asyncReadFile().then( () => done()).catch(err => done(err));
  });
});

describe('2. 用法', () => {
  it('(1) 指定50毫秒之后输出一个值', done => {
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function asyncPrint(value, ms) {
      await timeout(ms);
      console.log(value);
    }

    asyncPrint('hello world', 50).then(() => done()).catch(err => done(err));
  });

  it('(2) 指定50毫秒之后输出一个值的变种', done => {
    async function timeout(ms) {
      await new Promise(resolve => setTimeout(resolve, ms));
    }

    async function asyncPrint(value, ms) {
      await timeout(ms);
      console.log(value);
    }

    asyncPrint("hello world, I'm coming.", 50).then(() => done()).catch(err => done(err));
  });

  it('(3) async 函数有多种使用形式,声明，表达式，对象的方法，Class的方法， 箭头函数', () => {});
});

describe('3. 语法', () => {
  it('(1) async函数内部return语句返回的值，会成为then方法回调函数的参数。', () => {
    async function f() {
      return 'hello world , i am coming again.';
    }

    f().then(v => console.log(v));
  });

  it('(2) async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。', () => {
    async function f() {
      throw new Error('出错了!');
    }

    f().catch(e => {
      console.log(`${e.name}: ${e.message}`);
      expect(e.message).to.equal('出错了!');
    });
  });

  it('(3) async函数必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误(mocha fetch耗时较长，需要加上 --timeout 参数)', done => {
    async function getTitle(url) {
      let response = await fetch(url);
      let html = await response.text();
      return html.match(/<title>([\s\S]+)<\/title>/i)[1];
    }
    getTitle('http://es6.ruanyifeng.com/').then(title => {
      console.log(title);
      done();
    }).catch(err => done(err));
  });

  it('(4) 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。', done => {
    async function f() {
      return await 123;
    }

    f().then(v => console.log(v)).then(done);
  });

  it('(5) await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。', done => {
    async function f() {
      await Promise.reject('出错了');
    }

    f()
      .then(v => console.log(v))
      .catch(e => console.log(e))
      .then(done);
  });

  it('(6) 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。', done => {
    async function f() {
      await Promise.reject(new Error('出错了!'));
      await Promise.resolve('hello world');
    }

    f().catch(err=> { console.log(`${err.name}: ${err.message}`); done(); });
  });
});

describe('4. async 函数的实现原理', () => {
  it('(1) async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。', done => {
    function spawn(genF) {
      return new Promise((resolve, reject) => {
        let gen = genF();
        function step(nextF) {
          try {
            var next = nextF();
          } catch (e) {
            return reject(e);
          }

          if(next.done) {
            return resolve(next.value);
          }

          Promise.resolve(next.value).then(function(v){
            step(function() { return gen.next(v); });
          }, function(e) {
            step(function() { return gen.throw(e); });
          });
        }
        step(function() { return gen.next(undefined); });
      });
    }

    function fn(args) {
      return spawn(function * () {
        yield Promise.resolve(args);
        yield Promise.reject(new Error('出错了!'));
      });
    }

    fn('hello.world').then( v => {
      console.log(v);
      done();
    }).catch(err => {
      console.log(`${err.name}: ${err.message}`);
      done();
    });
  });
});

describe('5. 与其他异步处理方法的比较', () => {
  it('(1)Async函数的实现最简洁，最符合语义，几乎没有语义不相关的代码。它将Generator写法中的自动执行器，改在语言层面提供，不暴露给用户，因此代码量最少。');
});

describe('6. 实例：按顺序完成异步操作', () => {
  it('(1) Promise 遇到一组异步操作，需要按照顺序完成。', () => {
    function logInOrder(urls) {
      const textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
      });

      textPromises.reduce((chain, textPromise) => {
        return chain.then(() => textPromise ).then(text => console.log(text));
      }, Promise.resolve());
    }
  });

  it('(2)  async 函数实现。', () => {
    async function logInOrder(urls) {
      // 并发读取远程URL
      const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
      });

      // 按次序输出
      for (const textPromise of textPromises) {
        console.log(await textPromise);
      }
    }
  });
});

describe('7. 异步遍历器', () => {});

