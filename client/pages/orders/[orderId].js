import { ThemeProvider } from "@mui/private-theming"
import { CardContent, Typography, Button, CardActions } from '@material-ui/core'
import Countdown from 'react-countdown';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { makeStyles } from "@material-ui/styles";

const Order = ({order, baseTheme, currentUser}) => {
  if(!order){
    return <div>ggvghv</div>
  }
  


  console.log(order.expiresAt)
  console.log(new Date(order.expiresAt))
  return(
  <div className="card">
    {/*to do: CountDown */}
    <ThemeProvider theme={baseTheme}>

    <Typography color="textSecondary" gutterBottom>
    <Countdown date={new Date(order.expiresAt).getSeconds()} />          
    </Typography>
     <CardContent>
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
      <CardActions>
        <Button size="small"  >Pay</Button>
      </CardActions>
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