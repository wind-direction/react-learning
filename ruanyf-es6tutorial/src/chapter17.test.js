/**
 * todo: Generator 函数的异步应用
 * ref: http://es6.ruanyifeng.com/#docs/generator-async
 * command: mocha src/chapter17.test.js --compilers js:babel-core/register
 * Created by wind on 17/5/26.
 */

import { expect } from 'chai';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import readFile from 'fs-readfile-promise';
import thunkify from 'thunkify';

let ROOT = path.resolve(__dirname, '../');

describe('1. 传统方法', () => {
  it('异步编程在ES6诞生之前的类型:', () => {
    console.log('(1) 回调函数');
    console.log('(2) 事件监听');
    console.log('(3) 发布/订阅');
    console.log('(4) Promise对象');
  });
});

describe('2. 基本概念', () => {
  it('(1) 回调函数读取文件', done => {
    fs.readFile(path.resolve(ROOT,'api/numbers.txt'), 'utf-8', (err, data) => {
      if(err) throw err;
      let arr = data.split('\n');
      expect(arr).to.deep.equal(["1","2","3","4","5","6","7"]);
      done();
    });
  });

  it('(2) Promise读取文件', (done) => {
    readFile(path.resolve(ROOT, 'api/numbers.txt'), 'utf-8')
      .then(data => {
        let arr = data.split('\n');
        expect(arr).to.deep.equal(["1","2","3","4","5","6","7"]);
      })
      .then(() => readFile(path.resolve(ROOT, 'api/first.json'), 'utf-8'))
      .then(jsonTxt => {
        try {
          let info = JSON.parse(jsonTxt);
          expect(info).to.deep.equal({"id": 11022, "commentURL": "second.json"});
          done();
        }catch (e) {
          return Promise.reject(e);
        }
      })
      .catch(err => {
        done(err);
      });
  });
});

describe('3. Generator 函数', () => {
  it('(1) 协程的 Generator 函数实现 ', () => {
    function * gen(x) {
      let y = yield x + 2;
      return y;
    }

    let g = gen(1);
    expect(g.next()).to.deep.equal({value:3, done: false});
    expect(g.next()).to.deep.equal({value:undefined, done: true});
  });

  it('(2) Generator 函数的数据交换和错误处理', () => {
    function * gen(x) {
      try{
        var y = yield x + 2;
      }catch (e) {
        console.log(`${e.name}: ${e.message}`);
      }
      y = yield y + 1;
      return y;
    }

    let g = gen(1);
    expect(g.next()).to.deep.equal({value:3, done: false});
    g.throw(new Error('出错了!'));
    expect(g.next(2)).to.deep.equal({value:2, done: true});
  });

  it('(3) 异步任务的封装', done => {
    function* gen() {
      let url = 'https://api.github.com/users/github';
      let result = yield fetch(url);
      expect(result.url).to.equal(url);     // 这里可能有数据进行交换，即result 不一定是初始的fetch(url)对象
      done();
    }

    let g = gen();
    g.next().value
      .then( fetchObj => fetchObj.json() )  // 调用fetch的方法
      .then( data => g.next(data) )         // 将获取的数据返回给generator函数，进行数据交换,即 87行：let result = data;
      .catch( err => done(err) );
  });
});

describe('4. Thunk 函数', () => {
  it('(1) 基本概念 f(x + 5)', () => {
    console.log('\t(1) "传值调用"（call by value），即在进入函数体之前，就计算x + 5的值（等于6），再将这个值传入函数f。C语言就采用这种策略。');
    console.log('\t(2) "传名调用"（call by name），即直接将表达式x + 5传入函数体，只在用到它的时候求值。Haskell 语言采用这种策略。');
    console.log('\t(3) JavaScript 语言是传值调用。');
    console.log('\t(4) 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。');
  });

  it('(2) Thunk版本的readFile（单参数版本）', done => {
    let Thunk = function (fileName) {
      return function (callback) {
        return fs.readFile(fileName, callback);
      };
    };

    var readFileThunk = Thunk(path.resolve(ROOT, 'api/info.json'));
    readFileThunk(function(err, data){
      if(err) throw err;
      let info = JSON.parse(data);
      expect(info).to.deep.equal({ "id": 1, "title" : "hello world" });
      done();
    });
  });

  it('(3) ES6版本的Thunk', done => {
    const Thunk = function(fn) {
      return function(...args) {
        return function(callback) {
          return fn.call(this, ...args, callback);
        }
      }
    };

    let readFileThunk = Thunk(fs.readFile);
    readFileThunk(path.resolve(ROOT, 'api/info.json'))((err, data) => {
      if(err) done(err);
      expect(JSON.parse(data)).to.deep.equal({"id": 1, "title" : "hello world"});
      done();
    });
  });

  it('(4) thunkify的检查机制，确保回调只会执行一次', () => {
    function f(a, b, callback) {
      let sum = a + b;
      callback(sum);
      callback(sum);
    }

    let ft = thunkify(f);
    let print = console.log.bind(console);
    ft(1, 2)(print);
  });

  it('(5) Thunk 函数现在可以用于 Generator 函数的自动流程管理', done => {
    var readFileThunk = thunkify(fs.readFile);

    let g = function * () {
      var r1 = yield readFileThunk(path.resolve(ROOT, 'api/info.json'));
      console.log(r1.toString());
      var r2 = yield readFileThunk(path.resolve(ROOT, 'api/first.json'));
      console.log(r2.toString());
      done();
    };

    function run(fn) {
      let gen = fn();

      function  next(err, data) {
        var result = gen.next(data);
        if(result.done) return ;
        result.value(next);
      }

      next();
    }

    run(g);
  });
});
describe('5. co 模块', () => {
  it('(1) 基于Promise对象的自动执行', done => {
    let readFile = fileName => new Promise((resolve, reject) => {
      fs.readFile(fileName,(err,data) => {
        if(err) return reject(err);
        resolve(data);
      });
    });

    let gen = function * () {
      let f1 = yield readFile(path.resolve(ROOT, 'api/info.json'));
      let f2 = yield readFile(path.resolve(ROOT, 'api/first.json'));
      console.log(f1.toString());
      console.log(f2.toString());
    };

    function run(fn) {
      let ctx = this;

      return new Promise((resolve, reject) => {
        let g = fn.call(ctx);
        onFulfilled();


        function onFulfilled (res) {
          let ret;
          try {
            ret = g.next(res);
          } catch (e) {
            return reject(e);
          }
          next(ret);
        }

        function next(ret) {
          if(ret.done) return resolve(ret.value);
          return ret.value.then(onFulfilled, onRejected);
        }

        function onRejected(err) { return reject(err); }
      });
    }

    run(gen).then( () => {
      console.log('处理结束!');
      done();
    }).catch( err => done(err) );
  });

  it('(2) 处理并发的异步操作', () => {
    let co = require('co');
    co(function * () {
      let res = yield [
        Promise.resolve(1),
        Promise.resolve(2)
      ];
      console.log(res);
    }).catch(err => console.log(`${err.name}: ${err.message}`));
  });

  it('(3) 实例:处理 Stream ', done => {
    let co = require('co');
    const stream = fs.createReadStream(path.resolve(ROOT , 'api/悲惨世界.txt'));
    let valjeanCount = 0;
    co(function * (){
      while(true) {
        const res = yield Promise.race([
          new Promise(resolve => stream.once('data', resolve)),
          new Promise(resolve => stream.once('end', resolve)),
          new Promise((resolve, reject) => stream.once('error', reject))
        ]);

        if (!res) { break; }

        stream.removeAllListeners('data');
        stream.removeAllListeners('end');
        stream.removeAllListeners('error');
        valjeanCount += (res.toString().match(/valjean/ig) || []).length;
      }

      console.log('count:', valjeanCount);
    }).then( () => done()).catch(err => done(err));
  });
});
