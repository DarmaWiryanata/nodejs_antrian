"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/welcome").render("welcome");
Route.on("/about").render("about");
Route.on("/blog-single").render("blog-single");
Route.on("/blog").render("blog");
Route.on("/cart").render("cart");
Route.on("/checkout").render("checkout");
Route.on("/contact").render("contact");
Route.on("/shop").render("shop");

// Route.get("/", "HomeController.index").as("index");

// AuthController
Route.get('profile', 'AuthController.getProfile').as('profile').middleware(['auth'])
Route.get('login', 'AuthController.getLogin').as('login')
Route.post('login', 'AuthController.postLogin').as('login')
Route.get('register', 'AuthController.showRegisterForm')
Route.post('register', 'AuthController.register').as('register')
Route.get('register/confirm/:token', 'AuthController.confirmEmail')
Route.get('logout', 'AuthController.postLogout').as('logout').middleware(['auth'])
Route.get('password/reset', 'AuthController.showLinkRequestForm')
Route.post('password/email', 'AuthController.sendResetLinkEmail')
Route.get('password/reset/:token', 'AuthController.showResetForm')
Route.post('password/reset', 'AuthController.reset')

// FrontController
Route.get('/', 'FrontController.index').as('index.antrian')
Route.post('/store', 'FrontController.store').as('store.antrian').middleware(['auth'])
Route.get('/list', 'FrontController.list').as('list.antrian')
Route.get('/submerchant/:id', 'FrontController.show').as('show.antrian')