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
    const { email, password } = request.all();

    const data = await auth.withRefreshToken().attempt(email, password);

    return response.jaon({ data });
  }

  async refresh({ request, response, auth }) {
    let refresh_token = request.input('refresh_token');

    if (!refresh_token) {
      refresh_token = request.header('refresh_token');
    }

    const user = await auth
      .newRefreshToken()
      .generateForRefreshToken(refresh_token);

    return response.json({ data: user });
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
