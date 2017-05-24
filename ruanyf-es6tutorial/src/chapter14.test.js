/**
 * todo: Promise 对象
 * ref: http://es6.ruanyifeng.com/#docs/promise
 * command: mocha src/chapter14.test.js --compilers js:babel-core/register
 * Created by wind on 17/5/23.
 */
import { expect } from 'chai';
import { startServer } from '../components/server';
import { XMLHttpRequest } from 'xmlhttprequest';
import fetch from 'node-fetch';

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

  it('(1) 采用链式的then，可以指定一组按照次序调用的回调函数。', () => {
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
    getJSON(`${BASE_URL}/${API_GROUP}/first.json`).then(
      post => {
        let info = JSON.parse(post);
        return getJSON(`${BASE_URL}/${API_GROUP}/${info.commentURL}`)
      }
    ).then(
      comments => console.log("Resolved: ", comments),
      err => console.log("Rejected: ", err)
    );
  });
});

describe('3.Promise.prototype.catch()', () => {
  it('(1) 是.then(null, rejection)的别名，用于指定发生错误时的回调函数。', () => {
    let promise = new Promise((resolve, reject) => {
      throw new Error('test');
    });

    promise.catch(err => expect(err.message).to.equal('test'));
  });

  it('(2) 如果Promise状态已经变成Resolved，再抛出错误是无效的。', () => {
    let promise = new Promise((resolve, reject) => {
      resolve('ok');
      throw new Error('test');
    });

    promise
      .then(value => console.log(value))
      .catch(err => console.log(err));
  });

  it('(3) 如果没有使用catch方法指定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码.', ()=> {
    let someAsyncThing = () => new Promise( resolve => resolve(x + 2) );

    someAsyncThing().then(() => console.log('成功回调!'))
  });

  it('(4) 不指定try catch语句，造成错误冒泡到最外层', () => {
    let promise = new Promise((resolve, reject) => {
      resolve('ok');
      setTimeout( () => { throw new Error('test'); }, 0);
    });
    promise.then(value => console.log(value));
    // 捕获全局无处理的错误
    process.on('uncaughtException', err => console.log(err));
  });

  it('(5) catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。', () => {
    let someAsyncThing = () => new Promise(resolve => resolve(x + 2));

    someAsyncThing()
      .catch(err => console.log(`${err.name}: ${err.message}`))
      .then(() => console.log('carry on'));
  });

  it('(6) catch方法之中，还能再抛出错误。', () => {
    let someAsyncThing = () => new Promise(resolve => resolve(x+ 2));
    someAsyncThing()
      .then(() => someAsyncThing())
      .catch(err => {
        console.log(`oh no [${err.name}: ${err.message}]`);
        y + 2;
      }).catch(err => console.log(`carry on [${err.name}: ${err.message}]`));
  });
});

describe('4.Promise.all()', () => {
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

  it('(1) 生成一个Promise对象的数组', () => {
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

    let promises = ['book', 'first', 'second'].map(id => getJSON(`${BASE_URL}/${API_GROUP}/${id}.json`));

    Promise.all(promises)
      .then(posts => {
        expect(posts.length).to.equal(3);
      }).catch(err => console.log(`${err.name}: ${err.message}`))
  });
});

describe('5.Promise.race()', () => {
  it('(1) 只要有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。', () => {
    const p = Promise.race([
      fetch('https://gist.github.com/xjamundx/b1c800e9282e16a6a18e'),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), 100)
      })
    ]);

    p.then(response => console.log(response))
      .catch(err => console.log(`${err.name}: ${err.message}`, err));
  });
});

describe('6.Promise.resolve()', () => {
  it('(1) 参数是一个Promise实例,那么Promise.resolve将不做任何修改、原封不动地返回这个实例。', () => {
    let p1 = new Promise((resolve) => setTimeout(() => resolve(42), 500));

    let p2 = Promise.resolve(p1);
    expect(p1).to.deep.equal(p2);
  });

  it('(2) 参数是一个thenable对象。thenable对象指的是具有then方法的对象，比如下面这个对象。', () => {
    let thenable = {
      then(resolve, reject) { reject(new Error('test')); }
    };
    let p1 = Promise.resolve(thenable);
    p1.catch(err => console.log(`${err.name}: ${err.message}`))
  });

  it('(3)参数不是具有then方法的对象，或根本就不是对象, 则Promise.resolve方法返回一个新的Promise对象，状态为Resolved。', () => {
    let p = Promise.resolve('foo');
    p.then(s => console.log(s));
  });

  it('(4) 不带有任何参数,直接返回一个Resolved状态的Promise对象。', () => {
    let p = Promise.resolve();

    p.then(() => console.log('返回一个Resolved状态的Promise对象'));
  });

  it('(5) 需要注意的是，立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。', () => {
    setTimeout(() => console.log('three'), 0);
    Promise.resolve()
      .then(() => console.log('two'));
    console.log('one');
  });
});

describe('7.Promise.reject()', () => {
  it('(1) 会返回一个新的 Promise 实例，该实例的状态为rejected。', () => {
    let p = Promise.reject('出错了');
    p.catch(err => console.log(err));
  });

  it('(2) Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。', () => {
    const thenable = {
      then(resolve, reject) {
        reject('出错了!');
      }
    };

    Promise.reject(thenable)
      .catch(e => expect(e === thenable).to.equal(true));
  });
});

describe('8.两个有用的附加方法', () => {
  it('(1) done()', () => {
    Promise.prototype.done = function(onFulfilled, onRejected) {
      this.then(onFulfilled, onRejected)
        .catch(reason => { throw reason; });
    };

    let p1 = Promise.resolve('resolve:P1');

    let p2 = Promise.reject(new Error('reject: P2'));

    let p3 = Promise.reject(new Error('reject: P3'));

    Promise.resolve()
      .then(() => p2)
      .catch(err => {
        console.log(`L363: ${err.name}: ${err.message}`);
        return p1;
      })
      .then(response => {
        console.log(`L367: ${response}`);
        return p3;
      })
      .done();

    process.on('unhandledRejection', err => console.log(`L360: ${err.name}: ${err.message}`));
  });

  it('(2) finally()', () => {
    Promise.prototype.finally = function(callback) {
      let p = this.constructor;
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason; })
      );
    }
  });

});

describe('9.应用', () => {
  it('(1) 使用Generator函数与Promise的结合', () => {
    function getFoo() {
      return new Promise((resolve, reject) => {
        resolve('foo');
      });
    }

    let g = function* () {
      try {
        let foo = yield getFoo();
        console.log(foo);
      } catch (e) {
        console.log(e);
      }
    };

    function run (generator) {
      let it = generator();

      function go(result) {
        if(result.done) return result.value;

        return result.value.then(
          value => go(it.next(value)),
          err => go(it.throw(err))
        )
      }

      go(it.next());
    }

    run(g);
  });
});

describe('10.Promise.try()', () => {
  it('(1) 使用promise来处理同步函数，进行then式的操作', () => {
    console.log('=== (1) begin ====');
    const f = () => console.log('now');
    Promise.resolve().then(f);
    console.log('next');
    console.log('=== (1) end ====');
  });
  it('(2) 用async函数来解决同步函数被promise 包装成异步函数的问题', () => {
    console.log('=== (2) begin ====');
    const f = () => console.log('now');
    (async () => f())();
    console.log('next');
    console.log('=== (2) end ====');
  });

  it('(3) async () => f()会吃掉f()抛出的错误。所以，如果想捕获错误，要使用promise.catch方法。', () => {
    console.log('=== (3) begin ====');
    const f = () => {
      console.log('now');
      throw new Error('throw Err');
    };

    (async () => f())()
      .then()
      .catch(err => console.log(`${err.name}: ${err.message}`));
    console.log('next');
    console.log('=== (3) end ====');
  });

  it('(4) 使用new Promise()。', () => {
    console.log('=== (4) begin ====');
    const f = () => console.log('now');
    (
      () => new Promise(
        resolve => resolve(f())
      )
    )();
      console.log('next');
    console.log('=== (4) end ====');
  });

  it('(5) 使用Promise.try 进行错误的捕获', () => {});
});










