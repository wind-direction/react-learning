/**
 * Created by wind on 2017/6/28.
 */
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from 'actionTypes';

export { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from 'actionTypes';

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function completeTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

