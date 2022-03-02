import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web'
import { ThemeProvider } from '@material-ui/core'
import { appTheme } from './theme/theme'
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import Coffee from './pages/Coffee';
import Weather from './pages/Weather';

export default function App() {

    const [newsArticles, setNewsArticles] = useState([])
    const [orderedItems, setOrderedItems] = useState([])
    const [activeNewsCard, setActiveNewsCard] = useState(-1)
    const [userName, setUserName] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [userNotes, setUserNotes] = useState('')
    const [weatherData, setWeatherData] = useState({})
    let navigate = useNavigate()

    useEffect(() => {
        alanBtn({
            key: process.env.REACT_APP_ALAN_AI_API_KEY,
            onCommand: ({ command, articles, number, orderItems, name, address, notes, newWeatherData }) => {
                switch (command) {
                    //Commands received after intent mapping
                    //Navigation
                    case ('goToNews'):
                        navigate('/')
                        break

                    case ('goToCoffee'):
                        navigate('/coffee')
                        break

                    case ('goToWeather'):
                        navigate('/weather')
                        break

                    //News
                    case ('newHeadlines'):
                        setNewsArticles(articles)
                        setActiveNewsCard(-1)
                        break

                    case ('highlightNews'):
                        setActiveNewsCard((prevActiveNewsCard) => prevActiveNewsCard + 1)
                        break

                    case ('openArticle'):
                        const articleToOpen = articles[number - 1]
                        window.open(articleToOpen.url, '_blank')
                        break

                    //Coffee
                    case ('addOrder'):
                        setOrderedItems(orderItems)
                        break

                    case ('addName'):
                        setUserName(name)
                        break
                        
                    case ('addAddress'):
                        setUserAddress(address)
                        break

                    case ('addNotes'):
                        setUserNotes(notes)
                        break
                    
                    //Weather
                    case('updateWeather'):
                        setWeatherData(newWeatherData)
                        console.log(newWeatherData)
                        break

                    default:
                        console.log('Command not found!')
                }
            },
        })
    }, [])

    return (
        <ThemeProvider theme={appTheme}>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home newsArticles={newsArticles} activeNewsCard={activeNewsCard} />} />
                    <Route path='/coffee' element={<Coffee 
                        orderItems={orderedItems}
                        name={userName}
                        address={userAddress}
                        notes={userNotes}
                    />} />
                    <Route path='/weather' element={<Weather 
                        weatherData={weatherData}
                    />} />
                </Routes>
            </Layout>
        </ThemeProvider>
    );
}
