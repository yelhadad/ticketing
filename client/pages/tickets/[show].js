import { ThemeProvider } from "@emotion/react";
import { Grid, Typography, CardContent, CardActions, Button } from "@mui/material";
import axios from "axios";
import NextLink from 'next/link';
import { useRouter } from "next/router";

///////
const TicketsByUser  = ({currentUser, ticket, baseTheme}) => {
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault()
    let response;
    try {
      response = await axios.post('/api/orders', {
        ticketId: router.query.show
      })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    };

    if(response.data){
      router.push(`/orders/${response.data.id}`);
    }

  }

  return( 
  <div className="card">
    <ThemeProvider theme={baseTheme}>
     <CardContent>
        <Typography color="textSecondary" gutterBottom>
          titile: {ticket.title}
        </Typography>
        <Typography variant="h5" component="h2">
          -----------------
        </Typography>
        <Typography  color="textSecondary">
          price: {ticket.price}
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          description: 
          <br />
          {'comming soon!'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onSubmit} >Order the ticket</Button>
      </CardActions>
      </ThemeProvider>
    </div>
  );
}


TicketsByUser.getInitialProps = async ({query}, client) => {
  try {
    console.log(query.show)
    const { data } = await client.get(`/api/tickets/${query.show}`)
    console.log(data)
    return { ticket: data }
  } catch (error) {
    console.error(error.response.error.message)
  }
  return {}
}

export default TicketsByUser;
