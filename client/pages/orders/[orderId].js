import { ThemeProvider } from "@mui/private-theming"
import { CardContent,Grid, Typography, Button, CardActions } from '@material-ui/core'
import Countdown from 'react-countdown';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { makeStyles } from "@material-ui/styles";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";

const useStyles = makeStyles({
  cardContent: {
    textAlign: 'center'
  },
  CardActions: {
    justifyContent: 'center'
  }
})

const Order = ({order, baseTheme, currentUser}) => {
  if(!order){
    return <div>ggvghv</div>
  }

  const classes = useStyles();

  const paymentRequest = async (body) => {
    try {
      await axios.post('/api/payments', body)
    } catch (error) {
      console.error(error)
    }
  }

  console.log(order)
  console.log(new Date(order.expiresAt))
  return(
  <div className="container">
    {/*to do: CountDown */}
    <ThemeProvider theme={baseTheme}>
    <Grid xs={6} item className="card" style={{margin: '80px', justifyContent: 'center'}}>
     <CardContent className={classes.cardContent}>
     <Typography color="primary" gutterBottom>
    <Countdown date={new Date(order.expiresAt).getTime()} />          
    </Typography>
        <Typography color="textSecondary" gutterBottom>
          titile: {order.ticket.title}
        </Typography>
        <Typography variant="h5" component="h2">
          -----------------
        </Typography>
        <Typography  color="textSecondary">
          price: {order.ticket.price}
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          expires: 
          <br />
        {'jhvgjhvhj'}
        </Typography>
      </CardContent>
      <CardActions className={classes.CardActions}>
        <StripeCheckout token={({id}) => paymentRequest({token: id, orderId: order.id})}
         stripeKey='pk_test_51KrLgrHrlHk1pkZJneslrupU1mjaxs2O6aF9utjmphTwjd6bVqG307ZMaRm3DirNzVapuTX1U5OD3ULIlznsbXd800PPg26p1X'
         email={currentUser.email}
         amount={order.ticket.price * 100}/>
      </CardActions>
      </Grid>
      </ThemeProvider>
    </div>
  )
}


Order.getInitialProps = async ({query}, client) => {
  try {
    console.log(query.orderId)
    const { data } = await client.get(`/api/orders/${query.orderId}`)
    console.log(data.ticket.id)
    return { order: data }
  } catch (error) {
    console.error(error)
  }
  return {}
}

export default Order