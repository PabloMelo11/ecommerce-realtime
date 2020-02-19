const Database = use('Database');
const User = use('App/Models/User');
const Role = use('Role');
/* eslint-disable no-unused-vars */
class AuthController {
  async register({ request, response }) {
    const trx = await Database.beginTransaction();
    try {
      const { name, surname, email, password } = request.all();

      const user = await User.create(
        {
          name,
          surname,
          email,
          password,
        },
        trx
      );

      const userRole = await Role.findBy('slug', 'client');
      await user.role().attach([userRole.id], null, trx);
      await trx.commit();
      return response.status(201).json({ data: user });
    } catch (error) {
      await trx.rollback();
      return response
        .status(400)
        .json({ error: 'Erro ao realizar o cadastro' });
    }
  }

  async login({ request, response, auth }) {
    //
  }

  async refrash({ request, response, auth }) {
    //
  }

  async logout({ request, response, auth }) {
    //
  }

  async forgot({ request, response }) {
    //
  }

  async remember({ request, response }) {
    //
  }

  async reset({ request, response }) {
    //
  }
}

module.exports = AuthController;
