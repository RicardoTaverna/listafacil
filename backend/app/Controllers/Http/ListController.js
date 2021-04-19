'use strict'

const List = use("App/Models/List");
class ListController {
  /**
	 * Show a list of all lists.
	 * GET lists
	 *
	 * @param {object} ctx
   * @param {auth} ctx.auth
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
  async index ({params, auth, request, response}) {
    const list = await List.query().where('user_id', auth.user.id).fetch()

    return list
  }

  /**
	 * Show a list of all lists.
	 * GET lists
	 *
	 * @param {object} ctx
   * @param {auth} ctx.auth
	 * @param {Response} ctx.response
	 */
  async show ({ params, auth, response }) {
    const list = await List.findOrFail(params.id)
    if (list.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
  
    return list
  }

  /**
	 * Create/save a new lists.
	 * POST lists
	 *
	 * @param {auth} ctx.auth
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'listname',
      'descricao'
    ])
  
    const list = await List.create({ ...data, user_id: id })
  
    return list
  }

  async edit ({ params, request, response, view }) {
  }

  /**
	 * Update lists details.
	 * PUT or PATCH lists/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
   * @param {auth} ctx.auth
	 * @param {Response} ctx.response
	 */
  async update ({ params, auth, request, response }) {
    const list = await List.findOrFail(params.id);
    if (list.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
    const data = request.only([
      "listname", 
      "descricao"
    ]);

    list.merge(data);
    await list.save();

    return list;
  }

  /**
	 * Delete a lists with id.
	 * DELETE lists/:id
	 *
	 * @param {object} ctx
	 * @param {auth} ctx.auth
	 * @param {Response} ctx.response
	 */
  async destroy ({ params, auth, response }) {
    const list = await List.findOrFail(params.id)
  
    if (list.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
  
    await list.delete()
    return `Lista ${list.listname} removida com sucesso!`
  }

}

module.exports = ListController
