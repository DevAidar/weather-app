import React from 'react';
import { connect } from 'react-redux';

import ClearSky from '../../images/icons8-sun.png';
import NightClearSky from '../../images/icons8-bright_moon.png';
import FewClouds from '../../images/icons8-partly_cloudy_day.png';
import NightFewClouds from '../../images/icons8-partly_cloudy_night.png';
import ScatteredClouds from '../../images/icons8-cloud.png';
import Rain from '../../images/icons8-rain.png';
import Storm from '../../images/icons8-storm.png';
import Snow from '../../images/icons8-snow_storm.png';
import Foggy from '../../images/icons8-foggy_night_1.png';

import './Weather.css'

const Weather = (props) => {
  const descriptions = {
    CLEAR_SKY: '01',
    FEW_CLOUDS: '02',
    SCATTERED_CLOUDS: '03',
    BROKEN_CLOUDS: '04',
    SHOWER_RAIN: '09',
    RAIN: '10',
    THUNDERSTORM: '11',
    SNOW: '13',
    MIST: '50',
  };

  const dayConversion = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wendnesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }

  const getWeatherImage = index => {
    switch (props.weatherData.data.list[index].weather[0].icon.substr(0, 2)) {
      case descriptions.CLEAR_SKY:
        return props.weatherData.data.list[index].weather[0].icon[props.weatherData.data.list[index].weather[0].icon.length - 1] === 'd'
          ? ClearSky
          : NightClearSky;
      case descriptions.FEW_CLOUDS:
        return props.weatherData.data.list[index].weather[0].icon[props.weatherData.data.list[index].weather[0].icon.length - 1] === 'd'
          ? FewClouds
          : NightFewClouds;
      case descriptions.SCATTERED_CLOUDS:
      case descriptions.BROKEN_CLOUDS:
        return ScatteredClouds;
      case descriptions.SHOWER_RAIN:
      case descriptions.RAIN:
        return Rain;
      case descriptions.THUNDERSTORM:
        return Storm;
      case descriptions.SNOW:
        return Snow;
      case descriptions.MIST:
        return Foggy;
      default:
        return props.weatherData.data.list[index].weather[0].icon[props.weatherData.data.list[index].weather[0].icon.length - 1] === 'd'
          ? ClearSky
          : NightClearSky;
    }
  }

  const getDateObject = index => (new Date((props.weatherData.data.list[index].dt + props.weatherData.data.city.timezone) * 1000));
  const getTemperatureByIndex = index => parseInt(((props.weatherData.data.list[index].main.temp - 273.15) * 9 / 5 + 32) * 10) / 10;
  const getTemperature = temp => parseInt(((temp - 273.15) * 9 / 5 + 32) * 10) / 10;

  return props.weatherData ? (
    <>
      <div className='weather_card__today'>
        <div className='weather_card__today__main'>
          <p className='weather_card__today__city'>{`${props.weatherData.data.city.name} Weather`}</p>
          <p className='weather_card__today__time'>{`as of ${getDateObject(0).getUTCHours() % 12 === 0 ? '12' : getDateObject(0).getUTCHours() % 12}:${props.weatherData.data.list[0].dt_txt.substr(14, 2)} ${getDateObject(0).getUTCHours() > 11 ? 'pm' : 'am'}`}</p>
          <p className='weather_card__today__temp'>{`${getTemperatureByIndex(0)}°`}</p>
          <p className='weather_card__today__description'>{props.weatherData.data.list[0].weather[0].description.split(' ').map(elem => elem[0].toUpperCase() + elem.substr(1).toLowerCase()).join(' ')}</p>
        </div>
        <div className='weather_card__today__offset'>
          <img className='weather_card__today__img' src={getWeatherImage(0)} alt={props.weatherData.data.list[0].weather[0].main} />
          <p className='weather_card__today__temp-range'>
            {`${
              getTemperature(props.weatherData.data.list.reduce((temp_max, weather, index) => getDateObject(index).getUTCDate() === getDateObject(0).getUTCDate() ? Math.max(temp_max, weather.main.temp_max) : temp_max, props.weatherData.data.list[0].main.temp_max))
              }°/${
              getTemperature(props.weatherData.data.list.reduce((temp_min, weather, index) => getDateObject(index).getUTCDate() === getDateObject(0).getUTCDate() ? Math.min(temp_min, weather.main.temp_min) : temp_min, props.weatherData.data.list[0].main.temp_min))
              }°`}
          </p>
        </div>
      </div>
      <div className='weather_cards'>
        {props.weatherData.data.list.map((weather, index) => getDateObject(index).getUTCHours() > 10 && getDateObject(index).getUTCHours() < 14 ? (
          <div key={`${weather.dt}__${index}`} className='weather_card__weekly'>
            <p className='weather_card__weekly__date'>
              {`${dayConversion[getDateObject(index).getUTCDay()].substr(0, 3)} ${('0' + getDateObject(index).getUTCDate()).substr(-2)}`}
            </p>
            <p className='weather_card__weekly__max_temp'>
              {`${getTemperature(props.weatherData.data.list.reduce((temp_max, weather) => (new Date((weather.dt + props.weatherData.data.city.timezone) * 1000)).getUTCDate() === getDateObject(index).getUTCDate() ? Math.max(temp_max, weather.main.temp_max) : temp_max, props.weatherData.data.list[index].main.temp_max))}°`}
            </p>
            <p className='weather_card__weekly__min_temp'>
              {`${getTemperature(props.weatherData.data.list.reduce((temp_min, weather) => (new Date((weather.dt + props.weatherData.data.city.timezone) * 1000)).getUTCDate() === getDateObject(index).getUTCDate() ? Math.min(temp_min, weather.main.temp_min) : temp_min, props.weatherData.data.list[index].main.temp_min))}°`}
            </p>
            <img className='weather_card__weekly__img' src={getWeatherImage(index)} alt={props.weatherData.data.list[0].weather[0].main} />
          </div>
        ) : null)}
      </div>
    </>
  ) : null;
};

const mapStateToProps = (state) => ({
  weatherData: state.weatherData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);

