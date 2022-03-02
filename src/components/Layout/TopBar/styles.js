import { makeStyles } from "@material-ui/core"

export default makeStyles((theme) => ({
    topbar: {
        width: 'calc(100% - 240px)',
        marginTop: 0,
        backgroundColor: 'white',
        color: 'black',
        marginBottom: theme.spacing(4),
    },
    date: {
        flexGrow: 1,
    },
    avatar: {
        marginLeft: theme.spacing(3),
    },
    positionSikiza: {
        marginLeft: theme.spacing(40)
    }
}))