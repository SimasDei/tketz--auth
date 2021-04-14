import request from 'supertest';

import { app } from '../../app';
import { defaultUser } from '../__mocks__/defaultUser';

it('should return 201 on a successful signin', async () => {
  await request(app).post('/api/users/signup').send(defaultUser).expect(201);
  const response = await request(app).post('/api/users/signin').send(defaultUser).expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});

it('should fail the singin when incorrect password is supplied', async () => {
  await request(app).post('/api/users/signup').send(defaultUser).expect(201);
  defaultUser.password = '';
  const response = await request(app).post('/api/users/signin').send(defaultUser).expect(400);
  expect(response.get('Set-Cookie')).not.toBeDefined();
});
