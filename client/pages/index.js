import { Typography } from "@mui/material";
import axios from "axios";
import Link from 'next/link'
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { buildClient } from "../api/build-client";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';


 const LandingPage = (currentUser) => {
   const router = useRouter();
   const onClick = async () => {
     try {
      const response =  await axios.post('/api/users/signout')
      router.push('/');
     } catch (error) {
       //console.log(error.response.data)
     }
    }

    const [isSignedIn, setIssignIn] = useState('');
    useEffect(() => {
      if(currentUser.id !== undefined){
        setIssignIn('You are signined')
      } else {
        setIssignIn('You are not signined')
      }
    }, [])


   console.log(currentUser.id)
   console.log(currentUser)
  return (
    <div className="container" style={{textAlign: 'center', margin: '80px'}}>
      <Grid container spacing={8}>
       <Grid xs={12}>
       <h2>welcome to tickting.dev</h2>
         </Grid>
         <Grid xs={12}>
         <Typography variant="h3" component='h2' align="center" color='red' >{isSignedIn}</Typography>
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
        </Grid>
    </div>
  )
}
// this function can run on the client or on the server
// this function runs when moving to new page or rifreshing new page
LandingPage.getInitialProps = async (context) => {
   // checks if the function runs on the server or on the brozer
   const client = buildClient(context);
   try {
     const response = await client.get('/api/users/currentUser');
     return response.data;
   } catch (error) {
   //  console.log(error.response.data);
     return error.response.data;
   } 
   /*
   if (typeof window === 'undefined') {
     try {
       console.log('i was executed')
       // url to ingress nginx on the server
      const response = await axios.get(
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser',{
          headers: req.headers
        });
        return response.data;
     } catch (error) {
       console.log(error.response)
       return error.response.data;
     }
  } else {
    try {
      const response = await axios.get('/api/users/currentUser');
      return  response.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
   }*/
}


export default LandingPage;