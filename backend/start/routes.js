'use strict'


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
const Route = use('Route')

// Outras rotas
Route.get('/', () => {return { greeting: 'Hello world in JSON' }});


//Rotas List
Route.resource('list', 'ListController').apiOnly().middleware('auth')

// Rotas Product
Route.get('/product/get_products', 'ProductController.get_product');
Route.get('/product', 'ProductController.index');
Route.post('/product', 'ProductController.create')
Route.put('/product/:id', 'ProductController.update')
Route.delete('/product/:id', 'ProductController.delete');


// Rotas User
Route.get('/user', 'UserController.list_all');
Route.get('/user/:id', 'UserController.list_by_id');
Route.post('/user', 'UserController.create');
Route.put('/user/:id', 'UserController.update');
Route.delete('/user/:id', 'UserController.delete');
Route.post('/session', 'SessionController.create');
