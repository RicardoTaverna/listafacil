const { parseISO, isBefore, subHours } = require('date-fns');

const Token = use('App/Models/Token');

class ResetPasswordController {
  /**
   * Change and stores user new password.
   * POST password/reset
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
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

module.exports = ResetPasswordController;
