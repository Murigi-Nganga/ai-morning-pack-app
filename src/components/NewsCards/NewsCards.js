import React from 'react'
import { Grid, Grow, Typography } from '@material-ui/core'
import NewsCard from './NewsCard/NewsCard'
import useStyles from './styles'
import { teal, blueGrey, cyan } from '@material-ui/core/colors'

const infoCards = [
    {
        color: teal[800],
        title: 'News by Sources',
        info: 'CNN, Wired, BBC News, Fox News, CBS News, BuzzFeed, ABC News ...',
        text: 'Give me the news from ABC News'
    },
    {
        color: blueGrey[800],
        title: 'News by Categories',
        info: 'Business, Entertainment, Health, Sports, Technology ...',
        text: 'Give me the latest Entertainment news'
    },
    {
        color: cyan[800],
        title: 'News by Terms',
        info: 'Bitcoin, Covid 19, AFCON, Donald Trump ...',
        text: 'What\'s up with Smartphones'
    },
]

export default function NewsCards({ articles, activeNewsCard }) {

    const classes = useStyles()

    // Display information cards for the Newspage, when length = 0
    if (!articles.length) {
        return (
            <Grow in>
                <Grid className={classes.container} container spacing={3}>
                    {
                        infoCards.map((infoCard) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard} key={infoCard.title}>
                                <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                                    <Typography variant="h5" style={{ fontFamily: 'Merienda' }}>{infoCard.title}</Typography>
                                    {
                                        infoCard.info &&
                                        (
                                            <Typography className={classes.h6}>
                                                <strong style={{ fontFamily: 'Merienda' }}>
                                                    {infoCard.title.split(' ')[2]}
                                                </strong>
                                                <br />
                                                {infoCard.info}
                                            </Typography>
                                        )
                                    }
                                    <Typography className={classes.h6} >
                                        <strong style={{ fontFamily: 'Merienda' }}>Example statement:</strong>
                                        <br />
                                        {infoCard.text}
                                    </Typography>
                                </div>
                            </Grid>
                        ))}
                </Grid>
            </Grow>
        )
    }

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {articles.map((article, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
                        <NewsCard article={article} activeNewsCard={activeNewsCard} i={i} />
                    </Grid>
                ))}
            </Grid>
        </Grow>
    )
}