/**
 * Created by wind on 2017/6/28.
 */

import { createStore } from 'redux';
import todoApp from '../reducer/reducer';

let store = createStore(todoApp);

export default store;
