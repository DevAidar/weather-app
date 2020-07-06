import React from 'react';

import Header from '../components/Header/Header';
import Weather from '../components/Weather/WeatherByZip/WeatherByZip';

const WeatherByZip = (props) => (
    <>
        <Header />
        <div className='container'>
            <Weather />
        </div>
    </>
);

export default WeatherByZip;