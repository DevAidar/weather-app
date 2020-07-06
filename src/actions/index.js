import { FETCH_WEATHER_BY_ZIP } from '../constants';

import axios from 'axios';

const fetchWeatherByZip = zipCode => dispatch => {
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=${'ca4119e79f38e19e3439316278b0131a'}`)
    .then(res => dispatch({
      type: FETCH_WEATHER_BY_ZIP,
      weatherData: res,
    }))
    .catch(res => {
      console.error(res);
      return dispatch({
        type: FETCH_WEATHER_BY_ZIP,
        weatherData: {
          status: 404,
        }
      });
    });
};

export { fetchWeatherByZip };