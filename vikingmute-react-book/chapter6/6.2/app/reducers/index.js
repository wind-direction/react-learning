/**
 * Created by wind on 17/4/14.
 */
import { combineReducers } from 'redux';
import items from './items';
import editor from './editor';

const rootReducer = combineReducers({
  items,
  editor
});

export default rootReducer;
