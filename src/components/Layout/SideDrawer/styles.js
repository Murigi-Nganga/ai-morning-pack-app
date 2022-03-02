import { makeStyles } from '@material-ui/core'
import { blueGrey, blue } from '@material-ui/core/colors'

export default makeStyles((theme) => ({
    title: {
        padding: theme.spacing(2)
    },
    drawerPaper: {
        width: 240,
    },
    active: {
        backgroundColor: blueGrey[800],
        color: 'white',
        '&:hover': {
            color: 'black',
            backgroundColor: blue[100],
        }
    },
    drawerIcon: {
        color: blue[500],
    },
    drawerConatiner: {
        marginRight: theme.spacing(4)
    }
}))
