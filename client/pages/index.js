import { Typography } from "@mui/material";
import axios from "axios";
import Link from 'next/link'
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";


 const LandingPage = (currentUser) => {
   const onClick = async () => {
     try {
      const response =  await axios.post('/api/users/signout')     
     } catch (error) {
       console.log(error.response.data)
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
    <div className="container" style={{textAlign: 'center', margin: '20px'}}>
        <h2>welcome to tickting.dev</h2>
        <Link href ='/auth/signup'>
           <a> signup</a>
        </Link>
        <div> </div>
        <Link href ='/auth/signin'>
           <a> signip</a>
        </Link>
        <Grid>
          <Button color="secondary" variant="contained" onClick={onClick}>signout</Button>
        </Grid>
        <Typography component='h3' align="center" color='text.secondary' >{isSignedIn}</Typography>
    </div>
  )
}
// this function can run on the client or on the server
// this function runs when moving to new page or rifreshing new page
    LandingPage.getInitialProps = async ({ req }) => {
   // checks if the function runs on the server or on the brozer
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
       return error.response.data
     }
  } else {
    try {
      const response = await axios.get('/api/users/currentUser');
      return  response.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data
    }
   }
}


export default LandingPage;