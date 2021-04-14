import request from 'supertest';

import { app } from '../../app';
import { defaultUser } from '../__mocks__/defaultUser';

it('should remove singin cookie upon successful signout', async () => {
  await request(app).post('/api/users/signup').send(defaultUser).expect(201);
  const response = await request(app).post('/api/users/signin').send(defaultUser).expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
  const response2 = await request(app).post('/api/users/signout').send(defaultUser);
  expect(response2.get('Set-Cookie')).not.toBeDefined();
});
