import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 44.420704,
      lng: 26.162825
    },
    zoom: 15
  };

  render() {
    
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyATRFLBZBcK6ShPVrbxLOPt1PG47kIvdm4'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={44.420704}
            lng={26.162825}
            text="POINT ON MAP"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;

// import React, {Component} from 'react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


//   export class MapContainer extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         showingInfoWindow: false,
//         activeMarker: {},
//         selectedPlace: {}
//       }
//       this.onMarkerClick = this.onMarkerClick.bind(this);
//       this.onMapClick = this.onMapClick.bind(this);
//     }
//     onMarkerClick = (props, marker, e) => {
//       console.log("here");
//       this.setState({
//         selectedPlace: props,
//         activeMarker: marker,
//         showingInfoWindow: true
//       });
//     }
//     onMapClick = (props) => {
//       if (this.state.showingInfoWindow) {
//         this.setState({
//           showingInfoWindow: false,
//           activeMarker: null
//         });
//       }
//     }
    
//     render() {
//       if (!this.props.google) {
//         return <div>Loading...</div>;
//       }
//       return (
//         <Map 
//         google={this.props.google} zoom={14}
//         onClick = { this.onMapClick }
//         style={{
//           minWwidth: "200px",
//           minHeight: "200px",
//                 width: '50%'
//         }}
//         initialCenter={{
//           lat: 44.420704, 
//           lng: 26.162825
//         }}
//         >
 
//  <Marker
//             onClick={this.onMarkerClick}
//             title = { 'Changing Colors Garage' }
//             name={"Current location"}
//             position={{lat: 37.759703, lng: -122.428093}} />

// <Marker />
//  <InfoWindow
//             marker={this.state.activeMarker}
//             visible={this.state.showingInfoWindow}
//           >
//             <div>
//               <h1>{"this.state.selectedPlace.name"}</h1>
//             </div>
//           </InfoWindow>
//       </Map>
//       );
//     }
//   }

   
//   export default GoogleApiWrapper({
//     apiKey: ("AIzaSyATRFLBZBcK6ShPVrbxLOPt1PG47kIvdm4"),
//     // language: "EN",
//   })(MapContainer)

  
