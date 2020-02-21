const Database = use('Database');
const User = use('App/Models/User');
const Role = use('Role');
/* eslint-disable no-unused-vars */
class AuthController {
  async register({ request, response }) {
    const trx = await Database.beginTransaction();
    try {
      const { name, surname, email, password } = request.all();
      const user = await User.create({ name, surname, email, password }, trx);
      const userRole = await Role.findBy('slug', 'client');
      await user.roles().attach([userRole.id], null, trx);
      await trx.commit();
      return response.status(201).send({ data: user });
    } catch (error) {
      await trx.rollback();
      return response.status(400).send({
        message: 'Erro ao realizar cadastro!',
      });
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();

    const data = await auth.withRefreshToken().attempt(email, password);

    return response.json({ data });
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
    let refresh_token = request.input('refresh_token');

    if (!refresh_token) {
      refresh_token = request.header('refresh_token');
    }

    await auth.authenticator('jwt').revokeTokens([refresh_token], true);

    return response.status(204).json({});
  }

  async forgot({ request, response }) {
    return response.json({ ok: true });
  }

  async remember({ request, response }) {
    return response.json({ ok: true });
  }

  async reset({ request, response }) {
    return response.json({ ok: true });
  }
}

module.exports = AuthController;
