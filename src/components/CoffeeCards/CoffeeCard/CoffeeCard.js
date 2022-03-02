import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles'

export default function CoffeeCard({ coffee, imageUrl, i }) {
    const classes = useStyles();

    return (
        <Card className={classes.card} key={i}>
            <CardActionArea className={classes.cardActionArea}>
                <CardMedia
                    className={classes.media}
                    image={imageUrl}
                />
                <CardContent>
                    <Typography gutterBottom style={{ fontSize: 16 }}>
                        {coffee}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}


