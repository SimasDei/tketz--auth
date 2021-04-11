import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Ahoy Sailor o/ ⛵️');
});

export { router as currentUserRouter };
