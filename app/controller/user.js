const BaseController = require('./baseController');

class HomeController extends BaseController {
  async find() {
    const { userId } = this.ctx.query;
    const user = await this.service.user.find(userId);
    this.success(user);
  }

  async register() {
    try {
      const { ctx, service } = this;
      const { name, password } = ctx.request.body;
      this.ctx.validate({
        name: { type: 'string' },
        password: { type: 'string' },
      });
      const result = await service.user.register(name, password);
      this.success(!!result);
    } catch (err) {
      this.fail('服务器错误');
      console.log('err', err);
    }
  }

  async login() {
    const user = await this.ctx.model.User.create({ name: 'ben', password: '123' });
    this.success(user);
  }
}

module.exports = HomeController;
