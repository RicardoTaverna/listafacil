'use strict'

const { test, trait } = use('Test/Suite')('Create User');
const User = use('App/Models/User');

trait('Test/ApiClient');

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

test('can user authenticate if valid data', async ({ client }) => {
  const data = {
    "email":"teste@teste.com",
    "password":"teste"
  }
  
  const response = await client.post('/session').send(data).end();

  response.assertStatus(200);
})
