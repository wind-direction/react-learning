/**
 * @file: 
 * Created by wind on 17/3/21.
 * @todo:
 */

import React, { PropTypes } from 'react';
import marked from 'marked';

const propTypes = {
  item: PropTypes.object.isRequired
};

function ItemShowLayer({ item }) {
  // 如果没有传入Item, 直接返回一些静态的提示
  if(!item || !item.id){
    return (
      <div className="col-md-8 item-show-layer-component">
        <div className="no-select">请选择左侧列表里面的文章</div>
      </div>
    );
  }

  // 将MarkDown转换成HTML
  // 注意在渲染HTML代码是使用了描述过的jsx转译写法dangerouslySetInnerHTML
  let content = marked(item.content);
  return (
    <div className="col-md-8 item-show-layer-component">
      <div className="control-area">
        <button className="btn btn-primary">编辑</button>
        <button className="btn btn-danger">删除</button>
      </div>
      <h2>{item.title}</h2>
      <div className="item-text">
        <div dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </div>
  );
}

ItemShowLayer.propTypes = propTypes;

export default ItemShowLayer;
