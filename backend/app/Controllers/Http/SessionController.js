'use strict'

class SessionController {
    async create ({ request, auth }){
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);

        return token;
    }

    async show({ request, auth}){
        return auth.user.id
    }
}


module.exports = SessionController
