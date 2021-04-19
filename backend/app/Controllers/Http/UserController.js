'use strict'

const User = use("App/Models/User");

class UserController {
    /**
	 * Create/save a new user.
	 * POST user
	 *
	 * @param {Request} ctx.request
	 */
    async create({ request }){
        const data = request.only(["username", "email", "password"]);
        const user = await User.create(data)
        return user;
    }

    /**
	 * Show a list of all user.
	 * GET user
	 *
	 */
    async list_all(){
        const users = await User.all();
        return users;
    }

    /**
	 * Show a list of all user.
	 * GET user
	 *
	 * @param {object} ctx
	 */
    async list_by_id({ params }){
        const user = await User.findOrFail(params.id);
        return user;
    }

    /**
	 * Update product details.
	 * PUT or PATCH user/:id
	 *
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
    async update({ params, request }){
        const user = await User.findOrFail(params.id);
        const data = request.only(["username", "email"]);

        user.merge(data);
        await user.save();

        return user;
    }

    /**
	 * Delete a user with id.
	 * DELETE user/:id
	 *
	 * @param {object} ctx
	 */
    async delete({ params }){
        const user = await User.findOrFail(params.id);
        await user.delete();
        return `Usuário ${user.username} removido com sucesso!`
    }

}

module.exports = UserController
