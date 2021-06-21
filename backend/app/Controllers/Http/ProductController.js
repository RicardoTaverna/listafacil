/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const axios = require('axios');

const Product = use('App/Models/Product');

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const product = await Product.all();
    return product;
  }

  /**
   * Show a unic list with products.
   * GET list
   *
   * @param {object} ctx
   * @param {auth} ctx.auth
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    const product = await Product.findOrFail(params.id);

    response.status(200).json({
      data: product,
    });
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({ request, response, view }) {
    let data = request.only(['name', 'value', 'stablishment']);
    const total = data.value;
    data = { ...data, total }
    const product = await Product.create(data);

    response.status(200).json({
      data: product,
    });
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const product = await Product.findOrFail(params.id);
    const { name, quantity, value, stablishment, finished } = request.post();

    if(quantity > 0){
      product.quantity = quantity || product.quantity;
    } else {
      product.quantity = 1;
    }

    product.name = name || product.name;
    product.value = value || product.value;
    product.stablishment = stablishment || product.stablishment;
    product.finished = finished || product.finished;
    product.total = product.value * product.quantity;

    await product.save();

    return product;
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete({ params, request, response }) {
    const product = await Product.findOrFail(params.id);
    await product.delete();
    return `Produto ${product.name} removido com sucesso!`;
  }

}

module.exports = ProductController;
