import axios from "axios"
import { RenderedOrders } from '../../components/rendered-tickets'

const Orders = ({orders, baseTheme, currentUser}) => {
  console.log(orders)
  return ( 
    <Grid container xs={12}>
    <RenderedTickets tickets = {orders}/>
  </Grid>
    )
}


Orders.getInitialProps = async (context, client) => {
  let response;
  try {
    response = await client.get('/api/orders');
    return { orders: response.data}
  } catch (error) {
    console.log(error.response.message.errros);
  }
  return {};
};

export default Orders