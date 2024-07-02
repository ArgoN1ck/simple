import { AuthApi } from '@simple/sdk/client';

import { TokenFactory } from './factories';
import { AuthFixture } from './fixtures';

describe('Auth', () => {
  const api = new AuthApi();

  describe('/api/auth/', () => {
    it('/sign-up', async () => {
      const userData = AuthFixture.createForSignUp();

      const {
        data: { data, status },
      } = await api.signUp(userData);

      expect(status).toBe(201);
      expect(data).toBeDefined();
      expect(data).toHaveProperty('expiresIn');
      expect(data).toHaveProperty('accessToken');
    });

    it('/sign-in', async () => {
      const userData = AuthFixture.createForSignUp();
      await TokenFactory.createForUser(userData);

      const {
        data: { data, status },
      } = await api.signIn(userData);

      expect(status).toBe(201);
      expect(data).toBeDefined();
      expect(data).toHaveProperty('expiresIn');
      expect(data).toHaveProperty('accessToken');
    });
  });
});
