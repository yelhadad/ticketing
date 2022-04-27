import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Router, useRouter } from 'next/router';

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

export default function NewTicket({baseTheme}) {
  const theme = createTheme(baseTheme);

  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
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
      const response = await axios.post('/api/tickets', {
        title, price
      })
      router.push('/')
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data.error)
    }
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
          <Typography component="h1" variant="h5">
            Create new Ticket
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
              onChange={e => setPrice(e.target.value)}
              value={price}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              submit
            </Button>
            {errors.length > 0 && <div className='alert alert-danger'>
              <h4>Ooops....</h4>
              <ul className='my-0'>
              <div>{errors.map(err => <li>{err.message}</li>)}</div>
              </ul>
            </div>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
