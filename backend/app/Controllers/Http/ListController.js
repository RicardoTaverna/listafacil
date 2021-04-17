'use strict'

const List = use("App/Models/List");
class ListController {

  async index ({params, auth, request, response}) {
    const list = await List.query().where('user_id', auth.user.id).fetch()

    return list
  }

  async show ({ params, auth, response }) {
    const list = await List.findOrFail(params.id)
    if (list.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
  
  
    return list
  }
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
