import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.send('Ahoy Sailor o/ ⛵️');
});

export { router as signoutRouter };
