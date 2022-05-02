import { Typography } from "@mui/material";
import { Button, Grid } from "@mui/material";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import NextLink from 'next/link';


function SimpleCard(props) {
  const [ tickets, setTicket ] = useState(props.tickets);
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    button: {
      justifyContent: 'center'
    }
  });
  
    const classes = useStyles();
    if(!props.tickets){
      return null
    }
    console.log(props.tickets)
    const renderedTickets = Object.values(tickets).map(({title, price, id}) => {
      return (
        <Grid key={id} item xs={12} sm={4}>
          <div className="card">
          <CardContent>
            <Typography  color="textSecondary" gutterBottom>
              Title
            </Typography>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography  color="textSecondary">
              price
            </Typography>
            <Typography variant="body2" component="p">
              {price}
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions className={classes.button}>
            <NextLink href={`/tickets/${id}`}>
            <Button variant="contained" size="small" >
              show
            </Button>
            </NextLink>
          </CardActions>
          </div>
        </Grid>
       
      )
    })

  

  return renderedTickets;
}


export default SimpleCard;