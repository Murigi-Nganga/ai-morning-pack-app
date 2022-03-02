import React from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import { KeyboardArrowRightRounded } from '@material-ui/icons'
import useStyles from './styles'


export default function OrderForm({ orderItems, name, address, notes }) {
    const classes = useStyles()

    async function submitHandler(e) {
        e.preventDefault()
    }

    return (
        <div>
            <Typography variant='h6' className={classes.title}>Your Order</Typography>
            <Typography className={classes.order}> {orderItems.length > 0 && 'Order:'} {orderItems.join(', ')}</Typography>
            <br />
            <form
                noValidate
                autoComplete='off'
            >
                <Typography>Name</Typography>
                <TextField
                    className={classes.field}
                    value={name}
                    variant='outlined'
                    type='text'
                    fullWidth
                />
                <Typography>Address</Typography>
                <TextField
                    className={classes.field}
                    value={address}
                    variant='outlined'
                    type='text'
                    fullWidth
                />
                <Typography>Notes</Typography>
                <TextField
                    className={classes.field}
                    multiline
                    maxRows={5}
                    value={notes}
                    variant='outlined'
                    type='text'
                    fullWidth
                />
                <Button
                    className={classes.btn}
                    onSubmit={submitHandler}
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    endIcon={<KeyboardArrowRightRounded />}
                >
                    CHECK OUT
                </Button>
            </form>
        </div>
    )
}
