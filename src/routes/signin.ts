import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  res.send('Ahoy Sailor o/ ⛵️');
});

export { router as signinRouter };
