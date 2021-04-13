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


// Rotas POST
Route.post('/user/add', 'UserController.create')

// Rotas PUT
Route.put('/user/update/:id', 'UserController.update')

// Rotas DELETE
Route.delete('/user/delete/:id', 'UserController.delete')
