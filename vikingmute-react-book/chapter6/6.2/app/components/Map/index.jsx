import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class BaiduMap
 */
class Map extends React.Component {
  /**
   * @constructor
   * @id {String} the id to create DOM id
   */
  constructor(props) {
    super(props);
    this.id = props.id || 'allmap';
  }
  componentWillMount() {
    const script1 = document.createElement('script');
    script1.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=cQoqZZ4o1Yy96sEiIlIVkkek&services=&t=20170411141812';
    script1.type = 'text/javascript';
    document.body.appendChild(script1);
  }
  /**
   * @method componentDidMount
   */
  componentDidMount() {
    const BMap = window.BMap;
    this.map = new BMap.Map(this.props.id || 'location');
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    this.local = new BMap.LocalSearch(this.map, {
      renderOptions: { map: this.map },
      onInfoHtmlSet: (poi) => {
        if (typeof this.props.onSelect === 'function') {
          this.props.onSelect(poi.marker.getPosition());
        }
      }
    });
  }
  /**
   * @method search
   * @param {String} text - the search keyword
   */
  search(text) {
    this.local.search(text);
  }
  /**
   * @method render
   */
  render() {
    return (<div id={this.id} {...this.props} />);
  }
}

Map.propTypes = {
  /**
   * the id to create DOM id
   */
  id: PropTypes.string.isRequired,
  /**
   * this function will be fired when user click a marker and the info bubble is shown
   */
  onSelect: PropTypes.func.isRequired
};

export default Map;
