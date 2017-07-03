/**
 * Created by wind on 2017/6/28.
 */
import { combineReducers } from 'redux';
import { ADD_TODO,TOGGLE_TODO, SET_VISIBILITY_FILTER, GET_ALL_INFO, VisibilityFilters } from '../action/action';
const { SHOW_ALL } = VisibilityFilters;

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: (new Date()).getTime(),
          text: action.text,
          completed: false,
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if(index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    case GET_ALL_INFO:
    default: return state;
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

function getAllInfo(state = {}, action ){
  switch (action.type) {
    case GET_ALL_INFO: return state;
    default: return state;
  }
}

const todoApp = combineReducers({
  getAllInfo,
  visibilityFilter,
  todos
});

export default todoApp;



