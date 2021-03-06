import React from 'react';
import { connect } from 'react-redux';

import { fetchWeatherByZip } from '../actions';

import Header from '../components/Header/Header';
import Weather from '../components/Weather/Weather';

const WeatherSearch = (props) => {
  !props.weatherData && props.fetchWeatherByZip(90001);

  return (
    <>
      <Header />
      {props.weatherData
        ? props.weatherData.status === 200
          ? <Weather />
          : <h1>404 Page Not Found</h1>
        : <h2>Loading . . .</h2>
      }
      <div className='container'>
        <div className='container_footer'>
          <span className='container_footer_arrow'>
            &#8679;
          </span>
          <span className='container_footer_text'>
            Search for the weather
          </span>
          <span className='container_footer_arrow'>
            &#8679;
          </span>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  weatherData: state.weatherData,
});

const mapDispatchToProps = {
  fetchWeatherByZip,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherSearch);