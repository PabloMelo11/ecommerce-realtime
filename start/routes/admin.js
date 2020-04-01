/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.resource('categories', 'CategoryController').apiOnly();
  Route.resource('products', 'ProductController').apiOnly();
  Route.resource('coupons', 'CouponController').apiOnly();
  Route.resource('images', 'ImageController').apiOnly();
  Route.resource('orders', 'OrderController').apiOnly();
  Route.resource('users', 'UserController').apiOnly();
})
  .middleware('auth')
  .prefix('v1/admin')
  .namespace('Admin');
