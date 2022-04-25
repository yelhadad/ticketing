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

 const LandingPage = ({currentUser, tickets}) => {
   console.log('hi')
   console.log(tickets)
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
      <Grid container spacing={8}>
       <Grid xs={12}>
       <h2>welcome to tickting.dev</h2>
         </Grid>
         <Grid xs={12}>
         <Typography variant="h3" component='h2' align="center" color='red' >{'isSignedIn'}</Typography>
         </Grid>
          <Grid xs={4}>
            <AirplaneTicketIcon fontSize='large'/>
          </Grid>
          <Grid xs={4}>
            <AirplaneTicketIcon sx={{fontSize: 60}}/>
          </Grid>
          <Grid xs={4}>
            <AirplaneTicketIcon fontSize='large'/>
          </Grid>
          <Grid xs={4}  container spacing={2}>
          </Grid>
        </Grid> 
        <RenderedTickets tickets = {tickets}/>
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