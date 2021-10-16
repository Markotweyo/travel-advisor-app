import axios from "axios";

const URL ='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'



export const getPlacesData = async (sw, ne)=> {
    try {
        const {data: {data }}= await axios.get(URL, { 
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