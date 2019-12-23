import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; //import { Map } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class MapMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapObj: null,
      marker: null
    };
  }

  render() {
    if (this.props.mapObj != null) {
      console.log(this.props.children);
      let marker = L.marker([this.props.lat, this.props.lng], {}).addTo(this.props.mapObj);
      let elements = React.Children.map(this.props.children, item => {
        return React.createElement(item.type, {
          key: item.props.lng,
          lng: item.props.lng,
          lat: item.props.lat,
          markerObj: marker
        }, item.props.children);
      });
      return React.createElement("div", null, elements);
    }

    return React.createElement("div", null);
  }

}

export default MapMarker;