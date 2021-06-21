'use strict'

const { test, trait } = use('Test/Suite')('Create User');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions')

test('can create a user if valid data', async ({ client }) => {
  await User.create({
    username: "usuario teste",
    email: "teste@teste.com",
    password: "teste"
  });

  const response = await client.get('/user').end();

  response.assertStatus(200)
  response.assertJSONSubset([{
    username: "usuario teste",
    email: "teste@teste.com",
  }])
})

