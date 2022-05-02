import axios from "axios"

const Orders = ({orders, baseTheme, currentUser}) => {
  console.log(orders)
  return ( 
    <div>Orders</div>
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