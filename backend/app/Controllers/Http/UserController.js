'use strict'

const User = use("App/Models/User");

class UserController {
    // Classe da controller do usuário.
    async create({ request }){
        const data = request.only(["username", "email", "password"]);
        const user = await User.create(data)
        return user;
    }

    async list_all(){
        const users = await User.all();
        return users;
    }

    async list_by_id({ params }){
        const user = await User.findOrFail(params.id);
        return user;
    }

    async update({ params, request }){
        const user = await User.findOrFail(params.id);
        const data = request.only(["username", "email"]);

        user.merge(data);
        await user.save();

        return user;
    }

    async delete({ params }){
        const user = await User.findOrFail(params.id);
        await user.delete();
        return `Usuário ${user.username} removido com sucesso!`
    }

}

module.exports = UserController
