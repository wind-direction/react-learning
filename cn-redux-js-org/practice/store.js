/**
 * Created by wind on 2017/6/28.
 */

import { createStore } from 'redux';
import todoApp from './reducer';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './action';

let store = createStore(todoApp);

console.log(store.getState());
