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
Route.on("/").render("index");
Route.on("/about").render("about");
Route.on("/blog-single").render("blog-single");
Route.on("/blog").render("blog");
Route.on("/cart").render("cart");
Route.on("/checkout").render("checkout");
Route.on("/contact").render("contact");
Route.on("/product-single").render("product-single");
Route.on("/shop").render("shop");

Route.get("/merchants", "MerchantController.index");
Route.post("/merchants", "MerchantController.store");
Route.delete("/merchants/:id", "MerchantController.destroy");
