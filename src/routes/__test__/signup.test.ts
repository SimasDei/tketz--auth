import request from 'supertest';

import { app } from '../../app';
import { defaultUser } from '../__mocks__/defaultUser';

it('should return 201 on a successful signup', async () => {
  return request(app).post('/api/users/signup').send(defaultUser).expect(201);
});

it('should return 400 if email or password is invalid', async () => {
  const user = {
    ...defaultUser,
    email: '',
  };
  await request(app).post('/api/users/signup').send(user).expect(400);
  user.email = defaultUser.email;
  user.password = '';
  return request(app).post('/api/users/signup').send(user).expect(400);
});

it('should return 400 if no valid properties provided', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400);
});

it('should not allow signup with an already signed email', async () => {
  await request(app).post('/api/users/signup').send(defaultUser).expect(201);
  return request(app).post('/api/users/signup').send(defaultUser).expect(400);
});

it('should set a cookie after successful signup', async () => {
  const response = await request(app).post('/api/users/signup').send(defaultUser).expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
