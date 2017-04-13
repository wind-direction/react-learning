import React from 'react';
import uuid from 'uuid';

import TodoAction from '../actions/TodoAction';
import TodoStore from '../stores/TodoStore';

import List from './List';
import CreateButton from './CreateButton';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: TodoStore.getAll()
    };
    this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // 初始化的时候在store中注册这个事件
    TodoStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }

  onChange() {
    // store 改变后触发的回调，用setState来更新整个UI
    this.setState({
      todos: TodoStore.getAll()
    });
  }

  createTodo() {
    // 创建Todo 的事件回调
    TodoAction.create({ id: uuid.v4(), content: '3rd stuff' });
  }

  deleteTodo(id) {
    // 删除Todo 的事件回调
    TodoAction.delete(id);
  }
  render() {
    return (
      <div>
        <List items={this.state.todos} onDelete={this.deleteTodo} />
        <CreateButton onClick={this.createTodo} />
      </div>
    );
  }
}

export default Todo;
