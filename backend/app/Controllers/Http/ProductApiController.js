'use strict'

const axios = require('axios');

const url = 'https://listafacilapi.herokuapp.com/api/v1';

class ProductApiController {
  /**
   * Show a unique list with establishments.
   * GET api/establishment
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async indexEstablishments({ response }) {
    try {
      const res = await axios.get(`${url}/estabelecimentos`);
      return response.status(res.status).send(res.data);
    } catch (error) {
      return response.status(404).json({ err: error });
    }
  }

  /**
   * Show a unique list with products.
   * GET api/product
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async indexProducts({ response }) {
    try {
      const res = await axios.get(`${url}/produtos`);
      return response.status(res.status).send(res.data);
    } catch (error) {
      return response.status(404).json({ err: error });
    }
  }

  /**
   * Show a unique list with filtered establishments.
   * GET api/establishment/:name
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  async showEstablishments({ params, response }) {
    try {
      const res = await axios.get(
        `${url}/estabelecimentos/?nm_emp=${params.name}`
      );
      return response.status(res.status).send(res.data);
    } catch (error) {
      return response.status(404).json({ err: error });
    }
  }

  /**
   * Show a unique list with filtered products.
   * GET api/product/:product
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  async showProducts({ params, response }) {
    try {
      const res = await axios.get(`${url}/produtos/?search=${params.product}`);
      return response.status(res.status).send(res.data);
    } catch (error) {
      return response.status(404).json({ err: error });
    }
  }
}

module.exports = ProductApiController;
