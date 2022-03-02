import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import { LocalCafe, Cloud, ChromeReaderMode } from '@material-ui/icons'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SideDrawer() {

    const classes = useStyles()
    let navigate = useNavigate()
    const location = useLocation()

    const drawerItems = [
        {
            path: "/",
            text: "News",
            icon: <ChromeReaderMode className={classes.drawerIcon} />,
            key: 0,
            className: location.pathname === '/' && classes.active
        },
        {
            path: "/coffee",
            text: "Coffee",
            icon: <LocalCafe className={classes.drawerIcon} />,
            key: 1,
            className: location.pathname === '/coffee' && classes.active
        },
        {
            path: "/weather",
            text: "Weather",
            icon: <Cloud className={classes.drawerIcon} />,
            key: 2,
            className: location.pathname === '/weather' && classes.active,
        }
    ]

    return (
        <div className={classes.drawerConatiner}>
            <Drawer
                variant='permanent'
                anchor='left'
                classes={{ paper: classes.drawerPaper }}     //Overriding the in-built paper class
            >
                <Typography
                    variant='h5'
                    className={classes.title}
                >
                    AI Morning Pack
                </Typography>
                <List>
                    {
                        drawerItems.map((drawerItem) => (
                            <ListItem
                                key={drawerItem.key}
                                button
                                onClick={() => {
                                    navigate(drawerItem.path)
                                    window.scrollTo(0, 0)
                                }}
                                className={drawerItem.className}
                            >
                                <ListItemIcon>
                                    {drawerItem.icon}
                                </ListItemIcon>
                                <ListItemText primary={drawerItem.text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </div>
    )
}
