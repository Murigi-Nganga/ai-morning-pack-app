import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
    container: {
        padding: '0 5%',
        width: '100%',
        margin: 0,
        marginTop: theme.spacing(10),
    },
    splitScreen: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
    leftPane: {
        width: '60%',
    },
    rightPane: {
        width: '40%',
    },
    title: {
        marginBottom: theme.spacing(1.5)
    }
}))