'use strict'

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
	async index ({ request, response, view }) {
		const product = await Product.all();
		return product;
	}

	/**
	 * Create/save a new product.
	 * POST products
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async create ({ request, response, view }) {
		const data = request.only(["name", "value", "stablishment"])
		console.log(data);
		const product = await Product.create(data);
		return product;    
	}

	/**
	 * Update product details.
	 * PUT or PATCH products/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update ({ params, request, response }) {
		const product = await Product.findOrFail(params.id);
		const data = request.only(["value"]);
		
		product.merge(data);
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
	async delete ({ params, request, response }) {
		const product = await Product.findOrFail(params.id);
		await product.delete();
		return `Produto ${product.name} removido com sucesso!`;
	}

	/** 
	* Função para buscar na API do menor preco um produto.
	* @param {object} ctx - parametros passados pelo endpoint
	* @param {Request} ctx.request
	* @return {Request} cBrief description of the returning value here.
	*/  
	async get_product({ params, request }){
		const url = 'https://menorpreco.notaparana.pr.gov.br/api/v1/produtos';
		const headers = {'Access-Control-Allow-Origin': '*'}
		const data = await axios.get(
			url, 
			headers
			).then(function(response) {
				console.log('response is : ' + response);
			}).catch(function(error) {
				if(error.response){
					console.log(error.response.headers);
				}
				else if(error.request){
					console.log(error.request);
				}
				else {
					console.log(error.message);
				}
				console.log(error.config);
			});
		return data;
	}
}

module.exports = ProductController
