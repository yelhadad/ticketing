import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler } from '@ye-ticketing/common'; 
import { NotFoundError, currentUser } from '@ye-ticketing/common';
import { createTicketRouter } from './routes/new';
import { showTicket } from './routes/show';
import { ticketIndexRouter } from './routes';
import { ticketUpdateRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicket);
app.use(ticketIndexRouter);
app.use(ticketUpdateRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
