import React from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import MapMarker from '../MapMarker';
//import { Map } from 'react-leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapObj: null
        }
    }
    componentDidMount() {


        let mapEl = L.map(this.props.id, {
            center: [this.props.lat, this.props.lng],
            zoom: this.props.zoom,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ]
        });
        /*  this.props.children.map(item => {
              if (item.type.name == "MapMarker") {
                  let marker = L.marker([item.props.lat, item.props.lng], {}).bindPopup("I am a green leaf.").addTo(mapEl);
                  return {
                      mapElement: marker,
                      id: 0,
                      lng: item.props.lng,
                      lat: item.props.lat
                  }
  
              } else if (item.type.name == "MapCircle") {
                  var circle = L.circle([item.props.lat, item.props.lng], {
                      color: '#aaa',
                      fillColor: '#aaa',
                      fillOpacity: 0.3,
                      radius: 100,
                      weight: 1
                  }).addTo(mapEl);
              }
  
  
          })*/

        this.setState((state, props) => ({
            mapObj: mapEl
        }));


    }

    render() {

        let elements = React.Children.map(this.props.children, item => {
            return React.createElement(item.type, {
                key: item.props.lng,
                lng: item.props.lng,
                lat: item.props.lat,
                mapObj: this.state.mapObj
            }, item.props.children);

        })
        
        return <div id={this.props.id}>

            {elements}
        </div>
    }
}

export default Map;