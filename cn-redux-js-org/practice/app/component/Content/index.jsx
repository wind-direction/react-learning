import React from 'react';
import { connect } from 'react-redux';
import { getAllInfo } from '../../action/action';
import Footer from '../Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import './index.scss'

class Content extends React.Component {
  constructor({ dispatch }) {
    super();
    this.state = {
      info: dispatch(getAllInfo())
    };
  }

  render() {
    const strInfo = "原始store.getState():\n" + JSON.stringify(this.state.info, null, '\t');
    return (
      <div className="wrapper">
        <div className="aside">-</div>
        <div className="content">
            <pre>
              {strInfo}
            </pre>
            <div className="todoList">
              <AddTodo />
              <VisibleTodoList />
              <Footer />
            </div>
        </div>
      </div>
    );
  }
}

export default connect()(Content);
