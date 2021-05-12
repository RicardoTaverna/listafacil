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
const Route = use('Route');

// Outras rotas
Route.get('/', () => ({ greeting: 'Hello world in JSON' }));

// Rotas List
Route.resource('list', 'ListController').apiOnly().middleware('auth');

// Rotas Product
Route.get('/product/get_products', 'ProductController.get_product');
Route.get('/product', 'ProductController.index');
Route.get('/product/:id', 'ProductController.show');
Route.post('/product', 'ProductController.create');
Route.put('/product/:id', 'ProductController.update').middleware([
  'findProduct',
]);
Route.delete('/product/:id', 'ProductController.delete').middleware([
  'findProduct',
]);

// Rotas User
Route.get('/user', 'UserController.listAll');
Route.get('/user/:id', 'UserController.listById');
Route.post('/user', 'UserController.create');
Route.put('/user/:id', 'UserController.update');
Route.delete('/user/:id', 'UserController.delete');
Route.post('/session', 'SessionController.create');
Route.post('/forgot', 'ForgotPasswordController.store');
Route.post('/password/reset', 'ResetPasswordController.store').validator(
  'Reset'
);
