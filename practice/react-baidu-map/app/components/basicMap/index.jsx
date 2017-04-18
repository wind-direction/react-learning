/**
 * @file:
 * Created by wind on 17/4/18.
 * @todo:
 */

import React from 'react';
import Map from "../../../../../vikingmute-react-book/chapter6/6.2/app/components/Map/index";

class BasicMap extends React.Component {
  constructor(props){
    super(props);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    if(!this.props.loaded) {
      return <div className="text-center">Loading...</div>;
    }

    return (
      <Map baidu={this.props.baidu} onClick={this.onMapClicked} onDragend={this.onMapMoved}/>
    );
  }
}