import request from 'supertest';

import { app } from '../../app';
import { signin } from '../../test';
import { defaultUser } from '../__mocks__/defaultUser';

it('should respond with detais about current user', async () => {
  const response = await request(app)
    .get('/api/users/currentUser')
    .set('Cookie', await signin())
    .expect(200);
  expect(response.body.currentUser?.email).toEqual(defaultUser.email);
});

it('should response with current user being null if not authenticated', async () => {
  const response = await request(app).get('/api/users/currentUser').send().expect(200);
  expect(response.body.currentUser).toBeNull();
});
