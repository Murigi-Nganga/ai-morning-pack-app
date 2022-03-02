import { makeStyles } from "@material-ui/core/styles"
import { blueGrey } from "@material-ui/core/colors"

export default makeStyles({
    splitScreen: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
    leftPane: {
        width: '45%',
        backgroundSize: 'cover'
    },
    rightPane: {
        width: '55%',
    },
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    },
    form: {
        padding: '65px',
        marginTop: '5%',
    },
    btn: {
        marginTop: '25px',
        marginBottom: '25px'
    }, 
    title: {
        fontFamily: 'Merienda', 
        textAlign: 'center'
    }, 
    order: {
        color: `${blueGrey[700]}`, 
        fontWeight: 'bold'
    }
})