import { Typography } from "@mui/material";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import RenderedTickets from '../components/rendered-tickets'
import { ThemeProvider } from "@emotion/react";

 const LandingPage = ({currentUser, tickets, baseTheme}) => {
   console.log('hihh')
   console.log(tickets)
   console.log(currentUser)
/*
    const [isSignedIn, setIssignIn] = useState('');

    useEffect(() => {
      if(currentUser.id !== undefined){
        setIssignIn('You are signined')
      } else {
        setIssignIn('You are not signined')
      }
    }, []) */


    //const data = await fetchTicket();

  return (
    <div className="container" style={{textAlign: 'center', margin: '80px'}}>
      <ThemeProvider theme={baseTheme}>
      <Grid container spacing={2}>
       <Grid xs={12}>
       <h2>{`welcome: ${currentUser.email} to tickting.dev`}</h2>
         </Grid>
         <Grid xs={12}>
         <Typography variant="h3" component='h2' align="center" color='primary' >{'tickets:'}</Typography>
          </Grid>
        </Grid> 
        <Grid container xs={12}>
          <RenderedTickets tickets = {tickets}/>
        </Grid>
        </ThemeProvider>
    </div>

  )
}
// this function can run on the client or on the server
// this function runs when moving to new page or rifreshing new page
LandingPage.getInitialProps = async (context, client, currentUser) => {
  console.log('hi')
  try {
    const { data } = await client.get('/api/tickets');
    console.log(data)
    return {tickets: data};
  } catch (error) {
    console.log(error)
  }
  return {}
}


export default LandingPage;
