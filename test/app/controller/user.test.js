'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  it('should assert', async () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('register should assert', async () => {
    return app
      .httpRequest()
      .post('/api/register')
      .send({ name: 'test', password: '123' })
      .expect({ data: true, success: true })
      .expect(200);
  });
});
