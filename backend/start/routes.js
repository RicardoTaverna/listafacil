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
Route.get('/session', 'SessionController.show').middleware('auth')
Route.post('/user', 'UserController.create');
Route.put('/user/:id', 'UserController.update');
Route.delete('/user/:id', 'UserController.delete');
Route.post('/session', 'SessionController.create');
Route.post('/forgot', 'UserController.forgotPassword');
Route.post('/password/reset', 'UserController.resetPassword').validator(
  'Reset'
);

// Rotas API de produtos
Route.get('/api/establishment', 'ProductApiController.indexEstablishments');
Route.get(
  '/api/establishment/:name',
  'ProductApiController.showEstablishments'
);
Route.get('/api/product', 'ProductApiController.indexProducts');
Route.get('/api/product/:product', 'ProductApiController.showProducts');

Route.put('/user/:id/images/', 'ImageController.update').middleware('auth');
Route.post('/user/:id/images/', 'ImageController.create').middleware('auth');

Route.get('images/:path', 'ImageController.show');
Route.get('user/images/:id/', 'ImageController.index');