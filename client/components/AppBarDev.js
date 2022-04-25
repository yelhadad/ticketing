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

const AppBarDev = ({ currentUser }) => {
  let barLinks = [];
     barLinks = [
      !currentUser.id ? {herf: '/auth/signin', label: 'signin'}: false,
      !currentUser.id ? {herf: '/auth/signup', label: 'signup'}: false,
      currentUser.id ? {herf: '/auth/signout', label: 'signout'}: false
    ]
    .filter(linkConfig => linkConfig)
    .map(({ label, herf}) => {
      return (
        <NextLink key={herf} href={herf}>
        <Button color='inherit'>{label}</Button>
        </NextLink>
    )})
  



  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
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
          <NextLink href={'/'}>
            <Button size='large' color='inherit'>GitTix</Button>
          </NextLink>
          <Typography variant='h4' component='div' sx={{ flexGrow: 1}} style={{textAlign: 'center'}}>ticketing.dev</Typography>
          {barLinks}
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}
export {AppBarDev};