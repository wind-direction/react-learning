/**
 * todo: async 函数
 * ref: http://es6.ruanyifeng.com/#docs/async
 * command: mocha src/chapter18.test.js --compilers js:babel-core/register
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

  it('(3) async函数必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误', () => {
    async function getTitle(url) {
      let response = await fetch(url);
      let html = '';
    }
  });
});
describe('4. async 函数的实现原理', () => {});
describe('5. 与其他异步处理方法的比较', () => {});
describe('6. 实例：按顺序完成异步操作', () => {});
describe('7. 异步遍历器', () => {});

