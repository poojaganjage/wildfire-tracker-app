import React, {useState, useCallback} from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfo from './LocationInfo';

// const containerStyle = {
//   width: '400px',
//   height: '400px'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

function Map({eventData, center, zoom}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC7ZmWraCxhRMIQMJO2vAlfnBPX9SVj4RA'
  });
  const [locInfo, setLocInfo] = useState(null);
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  const markers = eventData.map((ev) => {
    if(ev.categories[0].id === 8) {
      return <LocationMarker lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocInfo({id: ev.id, title: ev.title})} />
    }
    return null;
  });
  return (
    <div className='map'>
      {isLoaded ? 
      // <GoogleMapReact 
      //   bootstrapURLKeys={{key: 'AIzaSyC7ZmWraCxhRMIQMJO2vAlfnBPX9SVj4RA'}} 
      //   defaultCenter={center} 
      //   defaultZoom={zoom} 
      // >
      //   {markers}
      //   <LocationMarker lat={center.lat} lng={center.lng} />
      // </GoogleMapReact>
      <GoogleMap 
        // mapContainerStyle={containerStyle}
        center={center} 
        zoom={zoom} 
        onLoad={onLoad} 
        onUnmount={onUnmount} 
      >
        {markers}
        <LocationMarker lat={center.lat} lng={center.lng} />
      </GoogleMap> : <></>}
      {locInfo && <LocationInfo info={locInfo} />}
    </div>
  );
}

Map.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -122.8765
  },
  zoom: 6
}
export default Map;
