const List = use('App/Models/List');
class ListController {
  /**
   * Show a list of all lists by user.
   * GET lists
   *
   * @param {object} ctx
   * @param {auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ auth }) {
    const list = await List.query().where('user_id', auth.user.id).fetch();

    return list;
  }

  /**
   * Show all lists.
   * GET lists/all
   *
   * @param {object} ctx
   */
     async indexAll() {
      const list = await List.all();
      return list;
    }

  /**
   * Show a unic list with products.
   * GET list
   *
   * @param {object} ctx
   * @param {auth} ctx.auth
   * @param {Response} ctx.response
   */
  async show({ params, auth, response }) {
    const list = await List.query()
      .where('id', params.id)
      .with('products')
      .fetch();

    const { user_id } = list.rows[0];

    if (user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    return list;
  }

  /**
   * Create/save a new lists.
   * POST lists
   *
   * @param {auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request }) {
    const { id } = auth.user;
    const { listname, descricao, products } = request.post();

    const list = await List.create({ listname, descricao, user_id: id });

    if (products && products.length > 0) {
      await list.products().attach(products);
      list.products = await list.products().fetch();
    }

    return list;
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
  async update({ params, auth, request, response }) {
    const list = await List.findOrFail(params.id);
    if (list.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    const { listname, descricao, finished, products } = request.post();

    list.listname = listname || list.listname;
    list.descricao = descricao || list.descricao;
    list.finished = finished || list.finished;

    await list.save();

    if (products && products.length > 0) {
      await list.products().detach();
      await list.products().attach(products);
      list.products = await list.products().fetch();
    }

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
  async destroy({ params, auth, response }) {
    const list = await List.findOrFail(params.id);

    if (list.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    await list.delete();
    return `Lista ${list.listname} removida com sucesso!`;
  }
}

module.exports = ListController;
