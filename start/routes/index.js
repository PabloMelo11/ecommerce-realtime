/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
// const Route = use('Route');

/**
 * Importa as rotas de autenticacao
 */
require('./auth');

/**
 * Importa as rotas de admin
 */
require('./admin');

/**
 * Importa as rotas dos clientes
 */
require('./client');
