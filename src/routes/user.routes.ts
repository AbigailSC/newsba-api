import { Router } from 'express';

const router: Router = Router();

router.route('/').get((_req, res) => {
  res.json({ message: 'Hello World!' });
});

export default router;
