import { makeStyles } from "@material-ui/core/styles"
import { blueGrey } from '@material-ui/core/colors'

export default makeStyles((theme) => ({
    media: {
        height: 250
    },
    border: {
        border: 'solid'
    },
    fullHeightCard: {
        height: '100%'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottom: '12px solid white'
    },
    activeArticle: {
        backgroundColor: blueGrey[100],
        borderBottom: `12px solid ${blueGrey[600]}`,
    },
    grid: {
        display: 'flex'
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px'
    },
    title: {
        padding: '0 16px',
        fontSize: '16px',
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
}))