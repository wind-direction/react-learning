/**
 * Created by wind on 2017/6/28.
 */
import { combineReducers } from 'redux';
import { ADD_TODO,TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './action';
const { SHOW_ALL } = VisibilityFilters;

function todos(state = [], action) {
  let todosRes;
  switch (action.type) {
    case ADD_TODO:
      todosRes = [
        ...state,
        {
          text: action.text,
          complete: false,
        }
      ];
      break;
    case TOGGLE_TODO:
      todosRes = state.map((todo, index) => {
        if(index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
      break;
    default: todosRes = state; break;
    return todosRes;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}
const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;



