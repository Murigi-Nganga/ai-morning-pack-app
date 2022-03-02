import React from 'react'
import { AppBar, Toolbar, Typography, Avatar } from '@material-ui/core'
import { format } from 'date-fns'
import useStyles from './styles'
import { blueGrey } from '@material-ui/core/colors'

export default function TopBar() {

    const classes = useStyles()
    return (
        <AppBar
            className={classes.topbar}
            elevation={1}
        >
            <Toolbar>
                <Typography className={classes.date}>
                    {format(new Date(), 'eeee, do MMMM Y')}
                </Typography>
                <Typography style={{ fontFamily: 'Merienda', fontSize: 30, color: blueGrey[700] }}>
                    Sikiza
                </Typography>
                <Typography className={classes.positionSikiza}>
                    Murigi Gracious Ng'ang'a
                </Typography>
                <Avatar src='../../images/avatar.jpeg' className={classes.avatar} />
            </Toolbar>
        </AppBar>
    )
}
