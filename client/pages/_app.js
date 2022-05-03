
/* the purpuse of this file is to enable bootstap on next js
project, I don't realy understant how this is working but let's 
give it a try! */
//
import 'bootstrap/dist/css/bootstrap.css';
import { buildClient } from '../api/build-client';
import * as React from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import { AppBarDev } from '../components/AppBarDev';
import { createTheme } from '@material-ui/core/styles';


const AppComponet =  ({ Component, pageProps, currentUser }) => {

  const baseTheme = createTheme({
    palette: {
      primary: {
        light: '#51b7ae',
        main: '#26a69a',
        dark: '#1a746b',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  return (
    <div>
      <AppBarDev currentUser={currentUser} theme={baseTheme}/>
      <Component currentUser={currentUser} {...pageProps} baseTheme={baseTheme} />
    </div>
  )
}

//custom app getInitialProps
// it gets appContext instead of context
// the context value is appContext.ctx
AppComponet.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  try {
    const response = await client.get('/api/users/currentUser');
    // luanch other get initial props in the application
  let pageProps = {}
  // make sures that getinitailprops is defiend.
  if(appContext.Component.getInitialProps){
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, response.data)
  }

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

