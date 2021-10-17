import axios from "axios";

export const getPlacesData = async (type, sw, ne)=> {
    try {
        const {data: {data }}= await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, { 
            params: {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat
          },
          
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': '70d787b3e4msh1e0f4206955c691p1225f0jsn1df953ddc958'
            }
          
        })
        
        return data

    } catch (error) {
        console.log(error)
        
    }
}

export const getWeatherData= async (lat, lng)=> {
  const URL = 'https://community-open-weather-map.p.rapidapi.com/weather'

  try {
    const {data}= await axios.get(URL, {
    
      params: { lat: lat, lon: lng },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': '70d787b3e4msh1e0f4206955c691p1225f0jsn1df953ddc958'
      }
    
  });
    
    return data
    
  } catch (error) {
    console.log(error)
    
  }
}