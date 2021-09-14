import { useEffect } from "react";

const DisplayWeather = (props) => {
    const {data, unsetWeather} = props;
    console.log(data);
    return (
        <>
        <h1>{Math.floor(data.main.temp - 273.15).toFixed(2) + "°C" }</h1>
        </>
     );
}
 
export default DisplayWeather;