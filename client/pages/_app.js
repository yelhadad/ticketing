
/* the purpuse of this file is to enable bootstap on next js
project, I don't realy understant how this is working but let's 
give it a try! */
//
import 'bootstrap/dist/css/bootstrap.css';
import { buildClient } from '../api/build-client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import axios from 'axios';
import { useEffect } from 'react';
import { AppBarDev } from '../components/AppBarDev';



const AppComponet =  ({ Component, pageProps, currentUser }) => {
  console.log(currentUser)
  const router = useRouter();
  const signout = async () => {
    try {
      const response = await axios.post('/api/users/signout');
    } catch (error) {
      console.log(response.data);
    }
  }
  const redirectFunc = (url) => {
    router.push(url)

  }

  console.log('path name: '+ router.pathname)

  const AuthButtons = () => {
    let authButtonsVar = <div>empty</div>
      // the user is signed in
      if(currentUser?.id){
        authButtonsVar = (
        <div>
          <Button color='inherit' onClick={signout}> signout</Button>
        </div>)
        return authButtonsVar;
        // the user isn't signed in
      } else {
        switch (router.pathname) {
          case '/':
            authButtonsVar = (
              <div>
               <Button color="inherit" onClick={e => redirectFunc('/auth/signin')}> signin</Button>
                <Button color="inherit" onClick={e => redirectFunc('/auth/signup')}> signup</Button>
              </div>)
            break;
          
          case '/auth/signin':
            authButtonsVar = (
              <div>
                <Button color="inherit" onClick={e => redirectFunc('/auth/signup')}> signup</Button>
              </div>)
              break;

          case '/auth/signup':
            authButtonsVar = (
              <div>
               <Button color="inherit" onClick={e => redirectFunc('/auth/signin')}> signin</Button>
              </div>)
         /* default:
            authButtonsVar = (
              <div>
               <Button color="inherit" onClick={e => redirectFunc('/auth/signin')}> signin</Button>
                <Button color="inherit" onClick={e => redirectFunc('/auth/signup')}> signup</Button>
                <Button color='inherit' onClick={e => signout}> signout</Button>
              </div>)
            break; */
        }
      }
    return authButtonsVar;
  }

  return (
    <div>
      {<AppBarDev currentUser={currentUser}/>
      }
      {/*<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GitiX
          </Typography>
          <Typography variant='h4' component='div' sx={{ flexGrow: 1}} style={{textAlign: 'justify'}}>ticketing.dev</Typography>
          <AuthButtons />

        </Toolbar>
      </AppBar>
    </Box> */ }
      <Component {...pageProps} />
    </div>
  
  )
}

//custom app getInitialProps
// it gets appContext instead of context
// the context value is appContext.ctx
AppComponet.getInitialProps = async (appContext) => {
  console.log("appContexttt:")
  const client = buildClient(appContext.ctx)
  try {
    const response = await client.get('/api/users/currentUser');
    // luanch other get initial props in the application
  let pageProps = {}
  // make sures that getinitailprops is defiend.
  if(appContext.Component.getInitialProps){
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  console.log(pageProps)
  return {
    pageProps,
    currentUser: response.data
  }
 } catch (error) {
    console.log(error.response.data);
    return {currentUser: error.response.data.error}
  }
}

export default AppComponet;