const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { parseISO, isBefore, subHours } = require('date-fns');

const Mail = use('Mail');
const Env = use('Env');

const Token = use('App/Models/Token');
const User = use('App/Models/User');

class UserController {
  /**
   * Create/save a new user.
   * POST user
   *
   * @param {Request} ctx.request
   */
  async create({ request }) {
    const { username, email, password, is_staff } = request.post();
    const user = await User.create({ username, email, password, is_staff });
    return user;
  }

  /**
   * Show a list of all user.
   * GET user
   *
   */
  async listAll() {
    const users = await User.all();
    return users;
  }

  /**
   * Show a list of all user.
   * GET user
   *
   * @param {object} ctx
   */
  async listById({ params }) {
    const user = await User.findOrFail(params.id);
    await user.load('images')
    return user;
  }

  /**
   * Update product details.
   * PUT or PATCH user/:id
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const user = await User.findOrFail(params.id);
    const { username, email, is_staff, name, lastname, adress, district, city, uf } = request.post();

    user.username = username || user.username;
    user.email = email || user.email;
    user.is_staff = is_staff || user.is_staff;
    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.adress = adress || user.adress;
    user.district = district || user.district;
    user.city = city || user.city;
    user.uf = uf || user.uf;

    await user.save();
    return user;
  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   *
   * @param {object} ctx
   */
  async delete({ params }) {
    const user = await User.findOrFail(params.id);
    await user.delete();
    return `Usuário ${user.username} removido com sucesso!`;
  }

  /**
   * Generete stores and send to user a token for change password.
   * POST forgot
   *
   * @param {Request} ctx.request
   */
  async forgotPassword({ request }) {
    const email = request.input('email');

    const user = await User.findByOrFail('email', email);

    const random = await promisify(randomBytes)(16);
    const token = random.toString('hex');

    await user.tokens().create({
      token,
      type: 'forgotpassword',
    });

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/password/reset/${token}`;

    await Mail.send(
      'emails.forgotpassword',
      { username: user.username, resetPasswordUrl },
      (message) => {
        message
          .to(user.email)
          .from('listafacill@gmail.com')
          .subject('Recupere sua senha');
      }
    );
  }

  /**
   * Change and stores user new password.
   * POST password/reset
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async resetPassword({ request, response }) {
    const { token, password } = request.only(['token', 'password']);

    const userToken = await Token.findByOrFail('token', token);

    if (isBefore(parseISO(userToken.created_at), subHours(new Date(), 2))) {
      return response
        .status(400)
        .json({ error: 'Sua Token expirou, reenvie o e-mail' });
    }

    const user = await userToken.user().fetch();

    user.password = password;

    await user.save();
    await userToken.delete();
  }
}

module.exports = UserController;
