/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product');

/**
 * Resourceful controller for interacting with categories
 */
class ProductController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination }) {
    const name = request.input('name');
    const query = Product.query();

    if (name) {
      query.where('name', 'ILIKE', `%${name}%`);
    }

    const products = await query.paginate(pagination.page, pagination.limit);

    return response.json(products);
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const { name, description, price, image_id } = request.all();

      const product = await Product.create({
        name,
        description,
        price,
        image_id,
      });

      return response.status(201).json(product);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Don't possible create this product" });
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response }) {
    const product = await Product.findOrFail(id);

    return response.json(product);
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id);

    try {
      const { name, description, price, image_id } = request.all();

      product.merge({ name, description, price, image_id });

      await product.save();

      return response.json(product);
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Nao foi possivel atualizar este produto!' });
    }
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id);

    try {
      await product.delete();

      return response.status(204).json();
    } catch (err) {
      return response
        .status(500)
        .json({ error: 'Nao foi possivel deletar esse produto' });
    }
  }
}

module.exports = ProductController;
