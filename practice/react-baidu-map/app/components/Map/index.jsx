/**
 * @file:
 * Created by wind on 17/4/18.
 * @todo:
 */
import React from 'react';
import T from 'prop-types';
import makeCancelable from '../lib/cancelablePromise';

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
      const BMap = window.BMap;
      const mapInstance = new BMap.Map('baiduMap');
      const curr = this.state.currentLocation;
      mapInstance.centerAndZoom(new BMap.Point(curr.lat, curr.lng));
      mapInstance.addControl(new BMap.MapTypeControl());
      mapInstance.setCurrentCity('北京');
      mapInstance.enableScrollWheelZoom(true);
    }
  }
  render() {
    return (
      <div>
        <div id="baiduMap">Loading map...</div>
      </div>
    );
  }
}

Map.propTypes = {
  baidu: T.objectOf,
  centerAroundCurrentLocation: T.bool,
  initialCenter: T.objectOf
};


Map.defaultProps = {
  baidu: {},
  initialCenter: {
    lat: 116.404,
    lng: 39.915
  },
  centerAroundCurrentLocation: false
};

export default Map;
