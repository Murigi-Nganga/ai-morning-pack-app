// Weather Page

import React from 'react'
import WeatherCard from '../components/WeatherCard/WeatherCard'

export default function Weather({ weatherData }) {
    return (
        <WeatherCard weatherData={weatherData} />
    )
}
