import React from 'react'
import { Grow, Grid, Typography } from '@material-ui/core'
import CoffeeCard from './CoffeeCard/CoffeeCard'
import useStyles from './styles'
import OrderForm from './OrderForm/OrderForm'
import DessertCard from './CoffeeCard/DessertCard'

const coffeeData = [
    {
        id: 0,
        coffee: 'Americano',
        imageUrl: '../../images/americano.jpg'
    },
    {
        id: 1,
        coffee: 'Cappuccino',
        imageUrl: '../../images/cappuccino.jpg'
    },
    {
        id: 2,
        coffee: 'Latte',
        imageUrl: '../../images/latte.jpg'
    }
]

const dessertData = [
    {
        id: 0,
        dessert: 'Brownie',
        imageUrl: '../../images/brownie.jpg'
    },
    {
        id: 1,
        dessert: 'Cheesecake',
        imageUrl: '../../images/cheesecake.jpg'
    },
    {
        id: 2,
        dessert: 'Blueberry cake',
        imageUrl: '../../images/blueberry.jpg'
    }
]

export default function CoffeeCards({ orderItems, name, address, notes }) {

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.splitScreen}>
                <div className={classes.leftPane}>
                    <Typography variant="h5" className={classes.title} style={{ fontFamily: 'Merienda' }}>Coffee</Typography>
                    <Grow in>
                        <Grid container spacing={3}>
                            {
                                coffeeData.map((item) => (
                                    <Grid item key={item.id}>
                                        <CoffeeCard
                                            coffee={item.coffee}
                                            imageUrl={item.imageUrl}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grow>
                    <br />
                    <Typography variant="h5" className={classes.title} style={{ fontFamily: 'Merienda' }}>Dessert</Typography>
                    <Grow in>
                        <Grid container spacing={3}>
                            {
                                dessertData.map((item) => (
                                    <Grid item key={item.id}>
                                        <DessertCard
                                            dessert={item.dessert}
                                            imageUrl={item.imageUrl}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grow>
                </div>
                <div className={classes.rightPane}>
                    <OrderForm
                        orderItems={orderItems}
                        name={name}
                        address={address}
                        notes={notes}
                    />
                </div>
            </div>
        </div>
    )
}
