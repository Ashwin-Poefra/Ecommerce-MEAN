# NgShop Mean Stack E-Commerce Application
## _Using Angular & NodeJs_

NgShop E-Commerce is an ecommerce application created by Nx Monorepo & Angularv14 & and nodejs,

## Features

- Manage users.
- Manage categories.
- Manage products.
- Manage orders & order-items.


## Extra Features
- Jwt authentication using express-jwt lib
- Upload File usign (nodejs , express, angular)
- Communicate between apps and libs using modules.
- Manage user Authentication using NgRx state management.

## Installation

NgShop E-Commerce Application requires [Node.js](https://nodejs.org/) v16.13.0+ to run.

Install the dependencies and devDependencies and start the server.

```sh
#For The Server
cd ngshop-mean-stack-ecommerce-app
cd server
npm i
npm start
#For The Client
cd ngshop-mean-stack-ecommerce-app
cd client
npm i
ng serve --open
```

For .env file

```sh
API_URL=your_api_base_url
SECRET=your_jwt_secret_key
CONNECTION_STRING=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Libraries (server & client)

NgShop E-Commerce Application is currently created with the following libraries.
Instructions on how to use them in your own application are linked below.

| Plugin | NPM | Version |
| ------ | ------ | ------ |
| nodemon | [https://www.npmjs.com/package/nodemon][NODEMON] | ^2.0.16
| express | [https://www.npmjs.com/package/express][EXPRESS] | ^4.18.1
| dotenv | [https://www.npmjs.com/package/dotenv][DOTENV] | ^16.0.1
| cors | [https://www.npmjs.com/package/cors][CORS] | ^2.8.5
| morgan | [https://www.npmjs.com/package/morgan][MORGAN] | ^1.10.0
| mongoose | [https://www.npmjs.com/package/mongoose][MONGOOSE] | ^6.3.6
| bcryptjs | [https://www.npmjs.com/package/bcryptjs][BCRYPT_JS] | ^2.4.3
| jsonwebtoken | [https://www.npmjs.com/package/jsonwebtoken][JSON_WEB_TOKEN] | ^8.5.1
| express-jwt | [https://www.npmjs.com/package/express-jwt][EXPRESS_JWT] | ^7.7.5
| multer | [https://www.npmjs.com/package/multer][MULTER] | ^1.4.5-lts.1
| primeng | [https://www.npmjs.com/package/primeng][PRIMENG] | ^13.4.1
| primeflex | [https://www.npmjs.com/package/primeflex][PRIMEFLEX] | ^3.1.2
| primeicons | [https://www.npmjs.com/package/primeicons][PRIMEICONS] | ^5.0.0
| normalize.css | [https://www.npmjs.com/package/normalize.css][NORMALIZE_CSS] | ^8.0.1
| quill | [https://www.npmjs.com/package/quill][QUILL] | ^1.3.7
| i18n-iso-countries | [https://www.npmjs.com/package/i18n-iso-countries][I18N_ISO_COUNTRIES] | ^7.5.0
| animate.css | [https://www.npmjs.com/package/animate.css][ANIMATE_CSS] | ^4.1.1
> Note:  you cand find more in `package.json` file.

[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

## Nx & Monorepo
##### Waht is a Nx?
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/angula10.png "angular nx libraries")

[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations.
- Dev tool.
- Typescript based mono repo tool.
- Built on top of Angular Devkit.
- Nx was created by Angular team at Google.
- Now its NRWL.

##### Why Nx?
- Nx provides tools to give you the benefits of a
monorepo without the drawbacks of simple
code collocation.
- Faster Command Execution.
- Controlled Code Sharing.
- Consistent Code Generation.
- Accurate Architecture Diagram.
- Great CLI.
- Rebuilding and Retesting what is Affected.

##### Waht is a Monorepo?
A monorepo is a version-controlled code repository that holds many projects. While these projects may be related, they are often logically independent and run by different teams.
When you woking with monorepo you can have :
**-One repository**
**-Multiple rpojects**
**-Shared Libraris**

##### Monorepo Exemple
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/monore10.png "monorepo")

[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### Monorepo Advantages
- Ease of code reuse.
- Simplified dependency management.
- Atomic commits.
- Collaboration across teams.
- Single package.json policy.
- Single node_modules Folder.

##### Monorepo Disadvantages 
- Maintain configurations.
- Coordinating a release process.
- Setting up an entire project.

## Project System desgin
##### Project Repository
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/projec10.png "project repository")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### NgRx Authentication Workflow
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/authen10.png "ngrx Authentication workflow")

[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### Checkout Workflow
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/check_10.png "checkout workflow")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

## Screenshots
##### Login Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0010.png "login page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### Dashbiard Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0115.png "dashboard page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### Users List Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0210.png "users list page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### New User Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0310.png "new user page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### Categories List Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0410.png "categories list page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### New Product Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0510.png "new product page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### Orders List Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0610.png "orders list page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### Home Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0710.png "home list page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### Products List Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0910.png "products list page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)

##### Checkout Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/0810.png "checkout page")
[⬆ back to top](#ngshop-mean-stack-e-commerce-application)
## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[dill]: <https://github.com/joemccann/dillinger>
[git-repo-url]: <https://github.com/joemccann/dillinger.git>
[john gruber]: <http://daringfireball.net>
[df1]: <http://daringfireball.net/projects/markdown/>
[markdown-it]: <https://github.com/markdown-it/markdown-it>
[Ace Editor]: <http://ace.ajax.org>
[node.js]: <http://nodejs.org>
[Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
[jQuery]: <http://jquery.com>
[@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
[express]: <http://expressjs.com>
[AngularJS]: <http://angularjs.org>
[Gulp]: <http://gulpjs.com>

[NODEMON]: <https://www.npmjs.com/package/nodemon>
[EXPRESS]: <https://www.npmjs.com/package/express>
[DOTENV]: <https://www.npmjs.com/package/dotenv>
[CORS]: <https://www.npmjs.com/package/cors>
[MORGAN]: <https://www.npmjs.com/package/morgan>
[MONGOOSE]: <https://www.npmjs.com/package/mongoose>
[BCRYPT_JS]: <https://www.npmjs.com/package/bcryptjs>
[JSON_WEB_TOKEN]: <https://www.npmjs.com/package/jsonwebtoken>
[EXPRESS_JWT]: <https://www.npmjs.com/package/express-jwt>
[MULTER]: <https://www.npmjs.com/package/multer>
[PRIMENG]: <https://www.npmjs.com/package/primeng>
[PRIMEFLEX]: <https://www.npmjs.com/package/primeflex>
[PRIMEICONS]: <https://www.npmjs.com/package/primeicons>
[NORMALIZE_CSS]: <https://www.npmjs.com/package/normalize.css>
[QUILL]: <https://www.npmjs.com/package/quill>
[I18N_ISO_COUNTRIES]: <https://www.npmjs.com/package/i18n-iso-countries>
[ANIMATE_CSS]: <https://www.npmjs.com/package/animate.css>
