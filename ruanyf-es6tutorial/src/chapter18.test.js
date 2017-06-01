/**
 * todo: async 函数
 * ref: http://es6.ruanyifeng.com/#docs/async
 * command: mocha src/chapter18.test.js --compilers js:babel-core/register
 * Created by wind on 17/6/1.
 */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import co from 'co';

const ROOT = path.resolve(__dirname, '../');

describe('1. 含义', () => {
  it('(1) 前文的一个Generator函数，依次读取两个文件', () => {
    let readFile = function(fileName){
      return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8' ,(error, data) => {
          if (error) reject(error);
          resolve(data);
        });
      });
    };

    let gen = function * () {
      let f1 = yield readFile(path.resolve(ROOT, 'api/numbers.txt'));
      let f2 = yield readFile(path.resolve(ROOT, 'api/book.json'));
      console.log(f1.toString());
      console.log(f2.toString());
    };

    co(gen);
  });
});
describe('2. 用法', () => {});
describe('3. 语法', () => {});
describe('4. async 函数的实现原理', () => {});
describe('5. 与其他异步处理方法的比较', () => {});
describe('6. 实例：按顺序完成异步操作', () => {});
describe('7. 异步遍历器', () => {});

