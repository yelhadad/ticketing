<<<<<<< HEAD
import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/router';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://ticketing.dev/">
        tickting.dev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();

export default function Signup() {

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const handleErrors = () => {
    if(errors.length > -1) {
      errors.map(error => {
        return <li key={error}>{error.message}</li>
      })
    }
    console.log(errors.length)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post('/api/users/signup', {
        email, password
      })
      router.push('/')
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data.error)
    }
    setEmail('');
    setPassword('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
             <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item >
                <NextLink href="/auth/signin" variant="body2">
                  {"Already have an account? Sign in"}
                </NextLink>
              </Grid>
            </Grid>
            {errors.length > 0 && <div className='alert alert-danger'>
              <h4>Ooops....</h4>
              <ul className='my-0'>
              <div>{errors.map(err => <li>{err.message}</li>)}</div>
              </ul>
            </div>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
=======
import { useState } from 'react';
import axios from 'axios'
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =  await axios.post('/api/users/signup',
             { email, password })
             console.log(response)
        } catch (error) {
            console.log(error.response)
        }
    } 

    return(
        <form className='container' id='form-signin' onSubmit={onSubmit}
        style={{width: '600px', height: '1000px', margin: '50px auto' }}>
            <h3 style={{textAlign: 'center'}}>signup :)</h3>
            <div class="form-group">
                <label>Email adrres</label>
                <input type="email" className='form-control' placeholder='Enter email' onChange={e => setEmail( e.target.value)}/>
                <small className='form-text text-muted'>for testing purpses</small>
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type="password" className='form-control' placeholder='Enter password' onChange={e => setPassword(e.target.value)}/>
                <small>for testing</small>
            </div>
            <div>
                <button type='submit' className='btn btn-primary'>submit</button>
            </div>
        </form>
    )
}

export default Signup
>>>>>>> 8eaf65a0aa8c493b62711eae16c1687aec27304a
