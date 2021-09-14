import { useEffect, useState } from 'react';
import './App.css';
import DisplayWeather from './DisplayWeather';

function App() {
  const [weather, setWeather] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [Item, setItem] = useState("");
  const [error, setError] = useState("");

  const APIKEY = "API KEY";
  function weatherData(e) {
    e.preventDefault();
    if (Item === "") {
      alert("Add values");
      return
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${Item}&APPID=${APIKEY}`
      )
        .then((res) =>{
          setIsPending(true)
          console.log(res);
          if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
          } 
        return res.json()
      })
        .then((data) => {
          setIsPending(false);
          setWeather(data);
          setError(null);
        })
        .catch(err => {
          console.log(err);
          // auto catches network / connection error
          if (err.name === 'AbortError'){
            console.log('fetch aborted')
          }else{
            // setIsPending(false);
            setError("Error");
          }
        })
        // console.log(data);
        // setWeather({ data: data });
    }
  }

  // useEffect((e) =>{
  //   e.preventDefault();
  //   if (form.city === "") {
  //     alert("Add values");
  //   } else {
  //     const data = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => data);
  //       console.log(data);
  //      setWeather({ data: data });
  //   }
  // })

  // const handleChange = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;

  //   if (name === "city") {
  //     setForm({ ...form, city: value });
  //   }
  // };

  // const cityChange = (e) => {
  //   if (weather) {
  //     setWeather(null);
  //   }
  //   if (e.target.value !== "") {
  //     setItem(e.target.value);
  //   }
    
  // }
  return (
    <div className="App">
      <form onSubmit = {weatherData}>
        <input
          type="text"
          value = {Item}
          placeholder="city"
          name="city"
          onChange={(e) => setItem(e.target.value)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        
        <button type='submit' className="getweather">
          Submit
        </button>
      </form>
      {error && {error}}
      {isPending && <div>Loading... </div>}
      {weather !== null ? (
        <div>
          <DisplayWeather data={weather} />
        </div>
      ) : <p></p>}
    </div>
  );
}

export default App;
