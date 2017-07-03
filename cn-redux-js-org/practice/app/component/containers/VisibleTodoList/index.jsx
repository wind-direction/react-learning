// 指定如何把当前 Redux store state 映射到展示组件的 props 中
import { connect } from 'react-redux';

import TodoList from '../../TodoList';
import { toggleTodo, VisibilityFilters } from '../../../action/action';
const { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } = VisibilityFilters;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL: return todos;
    case SHOW_COMPLETED: return todos.filter(t => t.completed);
    case SHOW_ACTIVE: return todos.filter(t => !t.completed);
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  }
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;

