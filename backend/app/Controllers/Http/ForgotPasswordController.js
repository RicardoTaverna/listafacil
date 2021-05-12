const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mail = use('Mail');
const Env = use('Env');

const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request }) {
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
}

module.exports = ForgotPasswordController;
