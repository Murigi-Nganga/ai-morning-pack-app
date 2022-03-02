import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import useStyles from './styles'

export default function WeatherCard({ weatherData }) {
    const classes = useStyles()

    if (weatherData.name) {
        return <div className={classes.container}>
            <Card>
                <CardContent>
                    <Typography variant='h4'>{weatherData.name}</Typography>       {/* The name = location */}
                    <Typography variant='h3'>{weatherData.temp}°C</Typography>
                    <img src={weatherData.icon} />
                    <Typography variant='h6'>{weatherData.description}</Typography>
                    <Typography variant='h6'>Humidity: {weatherData.humidity}%</Typography>
                    <Typography variant='h6'>Wind speed: {weatherData.speed}km/h</Typography>
                </CardContent>
            </Card>
        </div>
    } else {
        return <div className={classes.container}>
            <Card>
                <CardContent>
                    <Typography><b>Request for the weather data of any location</b></Typography>
                    <Typography
                        color='primary'
                    ><b><i>Example statement: What's the weather like in Addis Ababa?</i></b></Typography>
                </CardContent>
            </Card>
        </div>
    }

}
