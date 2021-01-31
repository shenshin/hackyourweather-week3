import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import './App.css';
import City from './components/City';
import SearchForm from './components/SearchForm';

dotenv.config();

function App() {
  const [cityName, setCityName] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchCity = async () => {
    try {
      setError(null);
      setLoading(true);
      /*
      Only allow a user to use the "Search City" button when the input
      field has at least 1 character
      */
      if (cityName.length < 1) throw new Error('City name should be at least 1 character long!');
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`);
      if (!response.ok) throw new Error(response.statusText);
      const weatherData = await response.json();
      weatherData.id = uuid();
      /*
      Any time a user searches for a new city, add it to a list of already searched cities
      */
      setSearchList([weatherData, ...searchList]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /*
  Allow a user to delete a search entry, by clicking the "X"
  */
  const removeCard = (id) => setSearchList(searchList.filter((city) => city.id !== id));

  return (
    <div className="App">
      <h1>Weather</h1>
      <SearchForm
        city={cityName}
        setCity={setCityName}
        searchCity={searchCity}
      />
      {error && <p>{error}</p>}
      {loading && !error && (
      <p>
        Loading weather data...
      </p>
      )}
      {searchList.length > 0
        ? searchList.map((cityWeather) => (
          <City
            key={cityWeather.id}
            id={cityWeather.id}
            cityWeather={cityWeather}
            removeCard={removeCard}
          />
        ))
        : !loading && <p>Enter city name</p>}
    </div>
  );
}

export default App;
