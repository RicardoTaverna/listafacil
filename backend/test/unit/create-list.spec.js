'use strict'

const { test, trait } = use('Test/Suite')('Create List');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');

test('can create a list if valid data', async ({ assert, client }) => {
  const user = await User.find(2);
  const data = {
    "listname": "lista teste",
    "descricao": "lista de teste"
  }

  const response = await client.post('/list').send(data).loginVia(user).end();
  response.assertStatus(200);
})
