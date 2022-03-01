import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  return res.send('hi');
})

export { router as signinRouter};