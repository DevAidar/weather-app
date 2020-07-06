import { FETCH_WEATHER_BY_ZIP } from '../constants';

const INITIAL_STATE = {
    weather: {},
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_WEATHER_BY_ZIP: 
            return {
                ...state,
                weatherData: action.weatherData,
            }
        default:
            return state;
    }
}

export default rootReducer;