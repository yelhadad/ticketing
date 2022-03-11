import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) =>{
  // deleting the cookie information
  req.session = null
  return res.send({});
})

export { router as signoutRouter};