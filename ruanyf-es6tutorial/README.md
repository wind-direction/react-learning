# [ES6标准入门](http://es6.ruanyifeng.com/#docs/intro)

此项目是对阮一峰的《[ES6标准入门](http://es6.ruanyifeng.com/#docs/intro)》书中的所涉及源码的实现。

采用mocha对所有源码进行测试用例的编写，方便验证和查阅。

## 部分笔记

### 16章:Generator 函数的语法

#### 简介

- 从语法上，可以将其理解成一个状态机，封装了多个内部状态。
- Generator 的两个特征：
    1. function关键字与函数名之间有一个星号；
    2. 函数体内部使用yield表达式，定义不同的内部状态。
- 必须调用遍历器对象的next方法，使得指针移向下一个状态。

#### yield 表达式

- yield表达式就是暂停标志。
- 运行逻辑：
    1. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
    2. 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
    3. 如果该函数没有return语句，则返回的对象的value属性值为undefined。
- yield 与 return 的区别：

    |    |yield                     |return                      |
    |:---|:-------------------------|:---------------------------|
    |1   |暂停，返回，并记录执行位置|返回，退出，不能记录执行位置|
    |2   |可以多次执行              |只能执行一次                |
    |3   |可以有多个                |只能有一个                  |

- Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。
- yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
- yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
- 可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
- yield表达式本身没有返回值，或者说总是返回undefined。
- 由于next方法的参数表示上一个yield表达式的返回值，所以第一次使用next方法时，不能带有参数。

#### Generator.prototype.throw()

- 遍历器对象的throw方法抛出的异常可以在Generator内部捕获，而用throw命令抛出的异常只能被函数体外的catch语句捕获。
- 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。并且不能被process.on('uncaughtException')捕获。

#### yield* 表达式

- 如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。

#### Generator 函数的this

- Generator函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性。这是因为g返回的总是遍历器对象
- Generator函数也不能跟new命令一起用，会报错。

#### 含义

- [协程的定义](http://es6.ruanyifeng.com/#docs/generator#Generator与协程)
- Generator 函数是 ES6 对协程的实现，但属于不完全实现。
- Generator 函数被称为“半协程”（semi-coroutine），意思是只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数。

### 17. Generator 函数的异步应用

#### 传统方法

异步编程的方法：

|方法       |说明                               |
|:----------|:----------------------------------|
|事件监听   |                                   |
|发布/订阅  |                                   |
|回调函数   |多重嵌套， 容易掉进"回调函数地域"  |
|Promise    |将回调函数的嵌套，改成链式调用     |
|coroutine  |多个线程互相协作，完成异步任务     |



为什么 Node 约定，回调函数的第一个参数，必须是错误对象err（如果没有错误，该参数就是null）？

```bash
答： 执行分成了两段，第一段执行结束完之后，任务所在的上下文环境就已经结束了。在这之后抛出的错误，原来的上下文已经无法捕捉，只能当做参数，传入第二段。
```

#### Thunk 函数

它是“传名调用”的一种实现策略，用来替换某个表达式。

编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

- 求值策略：
    1. 传值调用(call by value) : 即在进入函数体之前，就计算x + 5的值（等于6），再将这个值传入函数f。
    2. 传名调用(call by name): 直接将表达式x + 5传入函数体，只在用到它的时候求值
- 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。
- JavaScript 语言是传值调用。
- Thunk 函数真正的威力，在于可以自动执行 Generator 函数。
- Thunk 函数并不是 Generator 函数自动执行的唯一方案。
  因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。
  回调函数可以做到这一点，Promise 对象也可以做到这一点。

#### co 模块

author: TJ Holowaychuk

- Stream 模式使用 EventEmitter API，会释放三个事件。
    1. data事件：下一块数据块已经准备好了。
    2. end事件：整个“数据流”处理“完了。
    3. error事件：发生错误。

### 18章：async 函数

#### 用法

async函数对 Generator 函数的改进，体现在以下四点。

1. 内置执行器
2. 更好的语义
3. 更广的适用性
4. 返回值是Promise

#### 语法

async 函数返回一个Promise对象。
async 函数内部return语句返回的值，会成为then方法回调函数的参数。

##### await

1. 前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
2. 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
3. await命令只能用在async函数之中，如果用在普通函数，就会报错。




