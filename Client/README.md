# ShoppingCart - Yaniv Falik 204623268

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

##Store Name:
Green Garden

##What we are selling?
vegetables, fruits and more

##Additional Pages
Add product page - http://localhost:4200/admin/addProduct (you must have admin role)
This page available only for admins and enable to upload a new product to the server.

Last purchases page - http://localhost:4200/admin/purchasesHistory
This page available only for admins and enable to see the history purchase of all users.

##partner
Yogev Nissan, 
I was responsible for the front-end server ang Yogev was responsible for the server-side.

##routes
/home
/shop
/cart
/checkout
/login
/register
/admin
/admin/addProduct
/admin/userActivity
/admin/purchasesHistory

##Security
- The server defended from ddos by ddos npm package.
- All routes protected by guard auth - that check if the user login
- cookies available only via html - meaning protected from JS attacks.
- The server side alow origin only for the client host name - no other site can send request to the server.


