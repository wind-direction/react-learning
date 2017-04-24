/**
 * @file:
 * Created by wind on 17/4/18.
 * @todo:
 */
import React from 'react';
import T from 'prop-types';
import makeCancelable from '../lib/cancelablePromise';

export { wrapper } from '../lib/baiduWrapper';

class baiduMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 116.404,
        lng: 39.915
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

  componentDidUpdate() {
    this.loadMap();
  }

  loadMap() {
    if (window.BMap) {
      const BMap = window.BMap;
      const mapInstance = new BMap.Map('baiduMap');
      const curr = this.state.currentLocation;
      mapInstance.centerAndZoom(new BMap.Point(curr.lat, curr.lng), 11);
      mapInstance.addControl(new BMap.MapTypeControl());
      mapInstance.setCurrentCity('北京');
      mapInstance.enableScrollWheelZoom(true);
    }
  }
  render() {
    return (
      <div>
        <div id="baiduMap" style={{ width: '100%', height: 648 }}>Loading map...</div>
      </div>
    );
  }
}

baiduMap.propTypes = {
  centerAroundCurrentLocation: T.bool
};


baiduMap.defaultProps = {
  centerAroundCurrentLocation: false
};

export default baiduMap;
