const Product = use('App/Models/Product');

class FindProduct {
  async handle({ request, response, params: { id } }, next) {
    const product = await Product.find(id);

    if (!product) {
      return response.status(404).json({
        message: 'Product not found.',
        id,
      });
    }

    request.body.product = product;

    await next();
  }
}

module.exports = FindProduct;
