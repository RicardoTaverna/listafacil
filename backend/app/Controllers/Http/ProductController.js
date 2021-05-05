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
	 * Show a unic list with products.
	 * GET list
	 *
	 * @param {object} ctx
	 * @param {auth} ctx.auth
	 * @param {Response} ctx.response
	 */
	async show ({ params, response }) {
		const product = await Product.findOrFail(params.id);
				
		response.status(200).json({
		  	data: product
		})
	
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
		const { name, value, stablishment } = request.post();

		product.name = name || product.name;
		product.value = value || product.value;
		product.stablishment = stablishment || product.stablishment;
		
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
		const url = 'http://ricardotaverna.pythonanywhere.com/api/v1/produtos/';
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
		const data = await axios.get(
			url,
			headers,
			withCredentials
			).then(function(response) {
				console.log('Funcionei')
				console.log('response is : ' + response);
			}).catch(function(error) {
				if(error.response){
					console.log('Erro: retornado response.headers')
					console.log(error.response.headers);
				}
				else if(error.request){
					console.log('Erro: retornado request')
					console.log(error.request);
				}
				else {
					console.log('Erro: retornado message')
					console.log(error.message);
				}
				console.log('Erro: retornado config')
				console.log(error.config);
			});
		return data;
	}
}

module.exports = ProductController
