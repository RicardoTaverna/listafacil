const User = use('App/Models/User');
class SessionController {
  async create({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async createAdmin({ request, auth }) {
    const{ username, password } = request.all();
    const user = await User.findByOrFail('username', username);
    const token = await auth.attempt(user.email, password);
    
    return [token, user.is_staff];
  }

  async show({ request, auth}){
    return auth.user.id
  }
}


module.exports = SessionController
