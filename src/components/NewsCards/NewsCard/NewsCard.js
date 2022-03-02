import React, { createRef, useEffect, useState } from "react"
import { Card, CardActions, CardActionArea, CardMedia, Button, Typography } from '@material-ui/core'

import useStyles from './styles'

export default function NewsCard({ article: { publishedAt, source, title, url, urlToImage }, i, activeNewsCard }) {

    const classes = useStyles()
    const [cardRefs, setCardRefs] = useState([])
    const scrollToCardRef = (cardRef) => window.scrollTo(0, cardRef.current.offsetTop - 85)
    const fallbackImageUrl = 'https://unsplash.com/photos/WYd_PkCa1BY'  //Displayed if image cannot be fetched or found

    useEffect(() => {
        setCardRefs((refs) =>
            Array(20).fill().map((_, k) =>
                refs[k] || createRef()
            )
        )
    }, [])

    useEffect(() => {
        if (i === activeNewsCard && cardRefs[activeNewsCard]) {
            scrollToCardRef(cardRefs[activeNewsCard])
        }
    }, [i, activeNewsCard, cardRefs])


    return (
        <Card ref={cardRefs[i]} className={classes.card, (activeNewsCard === i && classes.activeArticle)}>
            <CardActionArea href={url} target='_blank' className={classes.cardActionArea}>
                <CardMedia className={classes.media} image={urlToImage || fallbackImageUrl} />
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt).toDateString())}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom >{title}</Typography>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" href={url} target='_blank'>Learn More</Button>
                <Typography variant="h6" color="textSecondary">{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}