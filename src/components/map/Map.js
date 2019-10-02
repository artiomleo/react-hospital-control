import React, { Component } from 'react'
import axios from 'axios';

import Map from 'pigeon-maps'
import Marker from '../pigeon-marker'
import EventMarker from '../pigeon-marker/eventMarker'
import InfoHospital from '../infoHospital/infoHospital'
import InfoDrone from '../infoHospital/infoDrone'
import PositionedSnackbar from '../snackbar/snackbar.jsx'
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "../snackbar/snackbar.jsx";
import { getPositions,getHospitals } from '../../api/requests'
import databaseHospital from "../../models/HospitalModel";
import databasePosition from "../../models/PositionModel";



// import pigeonSvg from './incubator/pigeon.svg'
// import DraggableOverlay from './incubator/draggable-overlay'

const mapboxEnabled = false

// please change this if you take some code from here.
// otherwise the demo page will run out of credits and that would be very sad :(



const providers = {
  osm: (x, y, z) => {
    const s = String.fromCharCode(97 + (x + y + z) % 3)
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
  },
  wikimedia: (x, y, z, dpr) => {
    return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png`
  },
  stamen: (x, y, z, dpr) => {
    return `https://stamen-tiles.a.ssl.fastly.net/terrain/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.jpg`
  }
  // ,
  // streets: mapbox('streets-v10', MAPBOX_ACCESS_TOKEN),
  // satellite: mapbox('satellite-streets-v10', MAPBOX_ACCESS_TOKEN),
  // outdoors: mapbox('outdoors-v10', MAPBOX_ACCESS_TOKEN),
  // light: mapbox('light-v9', MAPBOX_ACCESS_TOKEN),
  // dark: mapbox('dark-v9', MAPBOX_ACCESS_TOKEN)
}




function isMapBox(provider) {
  return provider === 'streets' || provider === 'satellite' || provider === 'outdoors' || provider === 'light' || provider === 'dark'
}

const MapboxAttribution = () => (
  <span className='map-attribution'>
    <span>© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a></span>{' | '}
    <span>© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a></span>{' | '}
    <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>
  </span>
)

const StamenAttribution = () => (
  <span className='map-attribution'>
    Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.
  </span>
)

const WikimediaAttribution = () => (
  <span className='map-attribution'>
    Map tiles by <a href='https://foundation.wikimedia.org/w/index.php?title=Maps_Terms_of_Use#Where_does_the_map_data_come_from.3F'>Wikimedia</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>
  </span>
)

export default class MapApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      center: [44.422354, 26.105733],
      zoom: 12,
      provider: 'wikimedia',
      metaWheelZoom: false,
      twoFingerDrag: false,
      animate: true,
      animating: false,
      zoomSnap: true,
      mouseEvents: true,
      touchEvents: true,
      minZoom: 1,
      maxZoom: 18,
      open: false,
      positions: [],
      showPosition: [],
      hospitals: [],
      formatted_address: '',
      nearest: '',
      minDistance: '',

    }


  }

  componentDidMount() {
    getPositions({}).then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ positions: res });
        })
      }
    })

    getHospitals({}).then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ hospitals: res });
          console.log(res);
        })
      }
    })
  }

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleBoundsChange = ({ center, zoom, bounds, initial }) => {
    if (initial) {
      console.log('Got initial bounds: ', bounds)
    }
    this.setState({ center, zoom })
  }

  handleClick = ({ event, latLng, pixel }) => {
    console.log('Map clicked!', latLng, pixel)
  }

  handleMarkerClick = ({ event, payload, anchor }) => {
    
    if (payload.injured !== undefined) {
      // this.setState({ center: anchor, zoom: 16 })
      this.getAddress(payload.latitude, payload.longitude).then(finalAdr=>this.setState({formatted_address:finalAdr})).catch(console.error);
 
      
      var distance = []
      var nearest = []

      const hospitals = this.state.hospitals
      for(let i in hospitals) {
        let aux = {}
        let res = this.distance(payload.place.slice(1, 9),payload.place.slice(12, 20),hospitals[i].place.slice(1, 9),hospitals[i].place.slice(12, 20))
        aux.name = hospitals[i].name
        aux.distance = res
        
        distance.push(aux);
        nearest.push(res)
      }
      var min = Math.min.apply(Math, nearest)
      var res = min.toString().slice(0,3);
      nearest = distance.filter((a)=> a.distance === min)
      payload.distance = nearest[0].distance

      this.setState({nearest: nearest[0].name})
      this.setState({minDistance: res})
      this.setState({open: true})

      var hospital = this.state.hospitals.filter((a)=> a.name === nearest[0].name) 
      var id = hospital[0]
      this.props.handleNearest(id);
      this.props.handlePosition(payload);
      
      databaseHospital.dispNearestCard(id.name)
      databasePosition.changeCardInfo(payload.terminalID)

      this.getAddress(payload.latitude, payload.longitude)
      .then(finalAdr=>databaseHospital.calculateSituation(payload,id.name,finalAdr))
      .catch(console.error);

    }

    if (payload.doctors !== undefined) {
      databaseHospital.changeCardInfo(payload.name)
    }

  }


  handleAnimationStart = () => {
    this.setState({ animating: true })
  }

  handleAnimationStop = () => {
    this.setState({ animating: false })
  }

  randomClick = () => {
    var list = this.state.positions
    var random = Math.floor(Math.random() * (+list.length - +0)) + +0;
    var pos = [list[random]]
    pos.push()
    this.setState({ showPosition: pos })

  }
  
  getAddress(latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=AIzaSyATRFLBZBcK6ShPVrbxLOPt1PG47kIvdm4';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    var sliceAdr = address.formatted_address.slice(address.formatted_address.indexOf("Strada"),address.formatted_address.length)
                    var finalAdr = sliceAdr.slice(0,sliceAdr.indexOf(','));
                    resolve(finalAdr);
                    
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
}

 deg2rad(deg) {
  return deg * (Math.PI/180)
}

 distance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

  getDistance(origin, destination) {
    axios.get('http://open.mapquestapi.com/directions/v2/route?key=ZoGOSVsak42Hc5vybNwcXdNtAN5BGjLq&from=' + origin + '&to=' + destination + '', {
      method: 'GET',
      mode: 'no-cors',
      contentType: 'application/json',

      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'application/json',
      }
    })
      .then(results => console.log(results.data.route.distance))
  }

  render() {
    const { center, zoom, provider, animate, metaWheelZoom, twoFingerDrag, zoomSnap, mouseEvents, touchEvents, animating, minZoom, maxZoom } = this.state

    return (
      <div style={{ textAlign: 'center', marginTop: 0 }}>

        <div style={{    background: "aliceblue", minWidth: 1000, minHeight: 400, margin: '0 auto' }}>
          <Map
            limitBounds='edge'
            center={center}
            zoom={zoom}
            provider={providers[provider]}
            dprs={[1, 2]}
            onBoundsChanged={this.handleBoundsChange}
            onClick={this.handleClick}
            onAnimationStart={this.handleAnimationStart}
            onAnimationStop={this.handleAnimationStop}
            animate={animate}
            metaWheelZoom={metaWheelZoom}
            twoFingerDrag={twoFingerDrag}
            zoomSnap={zoomSnap}
            mouseEvents={mouseEvents}
            touchEvents={touchEvents}
            minZoom={minZoom}
            maxZoom={maxZoom}
            attribution={
              isMapBox(provider)
                ? <MapboxAttribution />
                : provider === 'stamen'
                  ? <StamenAttribution />
                  : provider === 'wikimedia'
                    ? <WikimediaAttribution />
                    : null}
            defaultWidth={1000}
            height={400}
            boxClassname="pigeon-filters">
         {this.state.hospitals.map((key, id) => (
              <Marker key={id}  anchor={JSON.parse(key.place)} payload={key} onClick={this.handleMarkerClick} />
            ))}
            {this.state.positions.map((key, id) => (
              <EventMarker key={id} anchor={JSON.parse(key.place)} payload={key} onClick={this.handleMarkerClick} />
            ))}

            {isMapBox(provider) && <span className='mapbox-wordmark' />}
          </Map>
        </div>

        <div style={{marginTop: 50}}>
          {Object.keys(providers).map(key => (
            <button
              key={key}
              onClick={() => isMapBox(key) && !mapboxEnabled ? window.alert('Mapbox tiles disabled! See issue #33 for details!') : this.setState({ provider: key })}
              style={{fontWeight: provider === key ? 'bold' : 'normal', color: isMapBox(key) && !mapboxEnabled ? '#aaa' : '#000'}}>
              {key}
            </button>
          ))}
        </div>

        <div style={{ marginTop: -60 }}>
          <button onClick={() => this.setState({ center: [44.422354, 26.105733], zoom: 12 })}>Center Map</button>
          <button onClick={this.randomClick}>Random Point</button>

        </div>

          <InfoHospital
          />

          <InfoDrone
          formatted_address={this.state.formatted_address}
          />
{/* 
          <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={10000}
          onClose={this.handleClose}
          >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={"success"}
            message={
              'Nearest hospital: ' + this.state.nearest + ' with distance ' + this.state.minDistance + ' km'
            }
          />
           </Snackbar> */}
      </div>
    )
  }
}