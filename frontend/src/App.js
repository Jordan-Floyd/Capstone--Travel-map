import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from "@material-ui/icons";
import "./app.css";
import axios from "axios";
import {format} from "timeago.js"






function App() {
  const currentUser = "jordan";
  const [pins,setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 40.7608,
    longitude: -111.8910,
    zoom: 4,
  });




  useEffect(() => {
    const getPins = async () => {
      try{
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins()
  },[]);



  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude:lat, longitude:long })
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat:lat,
      long:long
    })
  };
  
  

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
        onViewportChange = {nextViewport => setViewport(nextViewport)}
        mapStyle = "mapbox://styles/jordanfloyd09/ckw3xi4ra1a2n14ocrt7envkq"
        onDblClick = {handleAddClick}
        transitionDruation = "200"
      >
        {pins.map((p) => (
          <>
        
        <Marker
          latitude = {p.lat} 
          longitude = {p.long} 
          offsetLeft = {-20} 
          offsetTop = {-10}
          >
          <Room
            style = {{ fontSize:viewport.zoom * 7, color: p.username===currentUser ?"tomato" : "blue",
             cursor:"pointer"
             }}
            onClick = {()=>handleMarkerClick(p._id, p.lat, p.long)}
          />
        </Marker>
        {p._id === currentPlaceId &&
          <Popup
            latitude={p.lat}
            longitude={p.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose = {()=>setCurrentPlaceId(null)}
            >
            <div className = "card">
              <label>Place</label>
              <h4 className = "place">{p.title}</h4>
              <label>Review</label>
              <p className = "desc">{p.desc}</p>
              <label>Rating</label>
              <div className = "stars">
                <Star className = "star"/>
                <Star className = "star"/>
                <Star className = "star"/>
                <Star className = "star"/>
                <Star className = "star"/>
              </div>
              <label>Information</label>
              <span className = "username">
                Created by <b>{p.username}</b> </span>
              <span className = "date">{format(p.createdAt)}</span>
            </div>
          </Popup>
          } 
          </>
        ))}
        {newPlace && (
        <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose = {()=>setNewPlace(null)}
            >
              <div>
                <form>
                  <label>Title</label>
                  <input placeholder = "Enter a title" />
                  <label>Review</label>
                  <textarea placeholder = "Say something about this place"/>
                  <label>Rating</label>
                  <select>
                    <option value = "1">1</option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5</option>
                  </select>
                  <button className = "submitButton" type = "submit">Add Pin</button>
                </form>
              </div>
            </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;


