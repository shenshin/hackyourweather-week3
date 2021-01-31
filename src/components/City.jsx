import React from 'react';

const City = ({ cityWeather, id, removeCard }) => (
  <div className="city-card">
    <h2>
      {`${cityWeather.name}, ${cityWeather.sys.country}`}
    </h2>
    <div className="city-weather-descr">
      <h3>{cityWeather.weather[0].main}</h3>
      <h5>{cityWeather.weather[0].description}</h5>
    </div>
    <div>
      <p>
        {`Min temperature: ${cityWeather.main.temp_min}`}
      </p>
      <p>
        {`Max temperature: ${cityWeather.main.temp_max}`}
      </p>
      <p>
        {`Location: ${cityWeather.coord.lat}, ${cityWeather.coord.lon}`}
      </p>
    </div>
    {/*
      Allow a user to delete a search entry, by clicking the "X"
    */}
    <button
      type="button"
      className="city-card-remove"
      onClick={() => removeCard(id)}
    >
      &otimes;
    </button>
  </div>
);

export default City;
