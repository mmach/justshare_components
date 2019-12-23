import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; //import { Map } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class MapMarkerPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.markerObj != null) {
      console.log(this.props);
      this.props.markerObj.bindPopup(this.props.children);
    }

    return React.createElement("div", null);
  }

}

export default MapMarkerPopup;