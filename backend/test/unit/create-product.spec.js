'use strict'

const { test, trait } = use('Test/Suite')('Create User');
const Product = use('App/Models/Product');

trait('Test/ApiClient');

test('can create a product if valid data', async ({ client }) => {
  await Product.create({
    name: "produto de teste",
    value: 22.99,
    stablishment: "teste"
  });

  const response = await client.get('/product').end();

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: "produto de teste",
    value: 22.99,
    stablishment: "teste"
  }])
})
