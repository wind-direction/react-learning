import uuid from 'uuid';
import EventEmitter from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';

// 单件类型的一个javascript Object
const TodoStore = assign({}, EventEmitter.prototype, {
  // 存放所有文章的列表，里面有两条默认的数据
  todos: [
    { id: uuid.v4(), content: 'first one' },
    { id: uuid.v4(), content: '2nd one' }
  ],
  getAll() {
    return this.todos;
  },
  addTodo(todo) {
    this.todos.push(todo);
  },
  deleteTodo(id) {
    this.todos = this.todos.filter(item => item.id !== id);
  },
  emitChange() {
    this.emit('change');
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'CREATE_TODO':
      TodoStore.addTodo(action.todo); //store发生变化的时候，则触发change事件
      TodoStore.emitChange();
      break;
    case 'DELETE_TODO':
      TodoStore.deleteTodo(action.id);
      TodoStore.emitChange();
      break;
    default: break;
  }
});

export default TodoStore;
