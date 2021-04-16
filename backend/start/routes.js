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

// Rotas GET
Route.get('/', () => {return { greeting: 'Hello world in JSON' }})
Route.get('/user/all', 'UserController.list_all')
Route.get('/user/find/:id', 'UserController.list_by_id')
Route.get('/list/all', 'ListController.list_all').middleware('auth')
Route.get('/list/find/:id', 'ListController.list_by_id').middleware('auth')


// Rotas POST
Route.post('/user/add', 'UserController.create')
Route.post('/session', 'SessionController.create')
Route.post('/list/add', 'ListController.create').middleware('auth')

// Rotas PUT
Route.put('/user/update/:id', 'UserController.update')
Route.put('/list/update/:id', 'ListController.update').middleware('auth')

// Rotas DELETE
Route.delete('/user/delete/:id', 'UserController.delete')
Route.delete('/list/delete/:id', 'ListController.delete').middleware('auth')
Route.resource('list', 'ListController').apiOnly().middleware('auth')
