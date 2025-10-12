import { Router } from 'express';
import { hashPassword } from '../dataModel/users';
import { AuthCredentials } from '@neptun/data-model';
import { dataModel } from '../dataModel/dataModel';
import { sign } from 'jsonwebtoken';
import { AppSettings } from '../settings';

const router = Router();

router.post('/get-token', async (req, res) => {
  const credentials = hashPassword(req.body as AuthCredentials);
  const user = await dataModel.users.findOne(credentials);

  if (!user) {
    res.status(401).json({ error: 'unauthorized', message: 'Invalid credentials' });
    res.json({ error: 'unauthorized', message: 'Invalid credentials' });
    return;
  }
  const data = {q
    username: user.username,
    email: user.email,
    changePassword: user.forceChangePassword
  };
  const token = sign(data, AppSettings.AUTHENTICATION_SECRET,
    {
      expiresIn: '1h',
      audience: user.forceChangePassword ? 'change-password' : 'neptun-ui'
    });
  res.json({ data, token });
});

router.get('/change-password', async (req, res) => {
  res.json({ message: 'Change password' });
})

export const authentication = router;
