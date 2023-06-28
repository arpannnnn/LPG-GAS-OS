

const authController = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const guest =require('../app/http/middlewares/guest')
function initRoutes(app) {
  homeController();
  app.get("/", homeController().index);

  app.get("/cart", cartController().index);
  app.post('/update-cart',cartController().update)

  app.get("/login",guest, authController().login);
  app.post("/login", authController().postLogin);

  app.get("/register",guest, authController().register);
  
  app.post("/logout",authController().logout);

//Customer routes

app.post("/orders",orderController().store);
app.get('customer/orders',orderController().index)




}

module.exports = initRoutes;
