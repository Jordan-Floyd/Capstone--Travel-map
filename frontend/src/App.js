import { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {Room} from "@material-ui/icons";





function App() {
  const [viewport, setViewport] = useState({
    width: "1vw",
    height: "100vh",
    latitude: 40.7608,
    longitude: -111.8910,
    zoom: 4
  });

  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
      onViewportChange = {nextViewport => setViewport(nextViewport)}
      >  
        <Marker
        latitude = {38.5733} 
        longitude = {-109.5498} 
        offsetLeft = {-20} 
        offsetTop = {-10}
        >
          <Room style = {{fontSize:viewport.zoom * 7, color:"red"}} />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;

