import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useRouter} from 'next/router';
import NextLink from 'next/link'
import { ThemeProvider } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.background,
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

const AppBarDev = ({ currentUser, theme }) => {

  let barLinks = [];
     barLinks = [
      !currentUser.id ? {herf: '/auth/signin', label: 'signin'}: false,
      !currentUser.id ? {herf: '/auth/signup', label: 'signup'}: false,
      currentUser.id ? {herf: '/orders', label: 'my orders'}: false,
      currentUser.id ? {herf: '/auth/signout', label: 'signout'}: false,
    ]
    .filter(linkConfig => linkConfig)
    .map(({ label, herf}) => {
      return (
        <NextLink key={herf} href={herf}>
        <Button color='inherit'>{label}</Button>
        </NextLink>
    )})

    const classes = useStyles();
    const themeInstance = {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    };


  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <NextLink href={'/'}>
            <Button size='large' color='inherit'>GitTix</Button>
          </NextLink>
          <NextLink href={'/tickets/new'}>
            <Button size='large' color='inherit'>New ticket</Button>
          </NextLink>
          <Typography variant='h4' component='div' sx={{ flexGrow: 1}} style={{textAlign: 'center'}}>ticketing.dev</Typography>
          {barLinks}
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  )
}
export {AppBarDev};