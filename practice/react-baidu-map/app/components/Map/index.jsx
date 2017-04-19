/**
 * @file:
 * Created by wind on 17/4/18.
 * @todo:
 */
import React from 'react';
import T from 'prop-types';
import ReactDOM from 'react-dom';

import makeCancelable from '../lib/cancelablePromise';

const evtNames = [
  'ready',
  'click',
  'dragend',
  'recenter',
  'bounds_changed',
  'center_changed',
  'dblclick',
  'dragstart',
  'heading_change',
  'idle',
  'maptypeid_changed',
  'mousemove',
  'mouseout',
  'mouseover',
  'projection_changed',
  'resize',
  'rightclick',
  'tilesloaded',
  'tilt_changed',
  'zoom_changed'
];

export { wrapper as baiduWrapper } from '../lib/baiduWrapper';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: this.props.initialCenter.lat,
        lng: this.props.initialCenter.lng
      }
    };
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        this.geoPromise = makeCancelable(
          new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          })
        );

        this.geoPromise.promise.then((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        }).catch(e => e);
      }
    }
    this.loadMap();
  }
  loadMap() {
    if (this.props && this.props.baidu) {
      const { baidu } = this.props;
      const maps = baidu.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const curr = this.state.currentLocation;
      const center = new maps.LatLng(curr.lat, curr.lng);

      const mapTypeIds = this.props.baidu.maps.MapTypeId || {};
      const mapTypeFromProps = String(this.props.mapType).toUpperCase();

      const mapConfig = Object.assign({}, {
        mapTypeId: mapTypeIds[mapTypeFromProps],
        center: center
      });

      Object.keys(mapConfig).forEach((key) => {
        // Allow to configure mapConfig with 'false'
        if (mapConfig[key] == null) {
          delete mapConfig[key];
        }
      });

      this.map = new maps.Map(node, mapConfig);

      evtNames.forEach((e) => {
        this.listeners[e] = this.map.addListener(e, this.handleEvent(e));
      });
      maps.event.trigger(this.map, 'ready');
    }
  }
  render() {
    return (
      <div>
        <div>Loading map...</div>
      </div>
    );
  }
}

Map.propTypes = {
  baidu: T.object,
  centerAroundCurrentLocation: T.bool,
  center: T.object,
  initialCenter: T.object,
  visible: T.bool
};


Map.defaultProps = {
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  center: {},
  centerAroundCurrentLocation: false,
  visible: true
};

export default Map;
