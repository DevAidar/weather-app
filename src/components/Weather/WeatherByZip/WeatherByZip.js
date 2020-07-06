import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchWeatherByZip } from '../../../actions';

import Weather from '../Weather';

const WeatherByZip = (props) => {
    let location = useLocation();

    const [zipCode, setZipCode] = useState(location.search.slice(1).split('&').find(param => param.toLowerCase().substr(0, param.indexOf('=')) === 'search').split('=')[1]);

    useEffect(() => {
        if (!isNaN(parseInt(zipCode)))
            props.fetchWeatherByZip(parseInt(zipCode));
    }, [zipCode]);

    useEffect(() => {
        setZipCode(location.search.slice(1).split('&').find(param => param.toLowerCase().substr(0, param.indexOf('=')) === 'search').split('=')[1]);
    }, [location])


    return zipCode
        ? props.weatherData 
            ? props.weatherData.status === 200
                ? <Weather />
                : <h1>404 Page Not Found</h1>
            : <h2>Loading . . .</h2>
        : <h1>404 Page Not Found</h1>;
}

const mapStateToProps = (state) => ({
    weatherData: state.weatherData,
});

const mapDispatchToProps = {
    fetchWeatherByZip,
};  

export default connect(mapStateToProps, mapDispatchToProps)(WeatherByZip);

