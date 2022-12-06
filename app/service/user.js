const Service = require('egg').Service;

class UserService extends Service {
  async find(uid) {
    const user = await this.ctx.model.User.findOne({ where: { id: uid }, raw: true });
    return user;
  }
  async register(name, password) {
    const { ctx } = this;
    const user = await ctx.model.User.create({ name, password });
    return user;
  }
}

module.exports = UserService;
