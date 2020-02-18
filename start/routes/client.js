/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.get('products', 'ProductController.inedx');
  Route.get('products/:id', 'ProductController.show');

  Route.get('orders', 'OrderController.index');
  Route.get('orders/:id', 'OrderController.show');
  Route.post('orders', 'OrderContrller.store');
  Route.put('orders/:id', 'OrderController.update');
})
  .prefix('v1')
  .namespace('Client');
