import React, {useState, useEffect} from 'react';
import {CssBaseline, Grid} from '@material-ui/core'

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData, getWeatherData } from './api';



const App=() =>{

  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({lat: latitude, lng: longitude});

    })
    
  }, []);

  useEffect(() => {
    const filteredPlaces= places.filter((place)=> place.rating > rating );
    setFilteredPlaces(filteredPlaces)
    
  }, [ rating]);

  
  useEffect(() => {
    if(bounds.sw && bounds.ne) {
    setIsLoading(true)

    getWeatherData(coordinates.lat, coordinates.lng)
    .then ((data)=> setWeatherData(data));

    getPlacesData(type, bounds.sw, bounds.ne)
    .then((data)=>{
      console.log(data?.filter((place)=>place.name && place.num_reviews > 0));
        setPlaces(data);
        setFilteredPlaces ([]); 
        setIsLoading(false);
        
    })
  }
  }, [type, bounds])

  return (
    <div>
      <CssBaseline/>
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style ={{width: '100%'}}>
        
        <Grid item xs ={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : places}
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>

        <Grid item xs ={12} md={8}>
          <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}
          weatherData={weatherData}
          />
        </Grid>

      </Grid>
      
      
      
    </div>
  );
}

export default App;
