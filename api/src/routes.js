const express = require("express");
const routes = express.Router();
const jwt = require("./middlewares/jsonwebtoken");

const LoginController = require("./controllers/LoginController");
const UserController = require("./controllers/UserController");
const VehiclesController = require("./controllers/VehiclesController");
const SosController = require("./controllers/SosController");
const EvaluationController = require("./controllers/EvaluationController");
const BudgetController = require("./controllers/BudgetController");
const MechanicalController = require("./controllers/MechanicalController");

const BoardSearch = require("./controllers/tools/BoardSearch");
const SosSearch = require("./controllers/tools/SosSearch");
const Upload = require("./controllers/tools/Upload");

routes.post("/login", LoginController.user);
routes.post("/loginMechanical", LoginController.mechanical);

routes.get("/tools/sos/", SosSearch.search);
routes.get("/tools/board/:board", BoardSearch.search);
routes.post("/tools/upload", jwt.verify, Upload.file);

routes.post("/users", UserController.store);
routes.get("/users/:id", jwt.verify, UserController.index);
routes.put("/users/:id", jwt.verify, UserController.update);

routes.post("/users/:id/vehicles", jwt.verify, VehiclesController.store);
routes.get("/users/:id/vehicles", jwt.verify, VehiclesController.list);
routes.get("/users/:id/vehicles/:idVehicle", jwt.verify, VehiclesController.index);
routes.put("/users/:id/vehicles/:idVehicle", jwt.verify, VehiclesController.update);
routes.delete("/users/:id/vehicles/:idVehicle", jwt.verify, VehiclesController.remove);

routes.post("/users/:id/sos", jwt.verify, SosController.store);
routes.get("/users/:id/sos", jwt.verify, SosController.list);
routes.get("/users/:id/sos/:idSos", jwt.verify, SosController.index);
routes.put("/users/:id/sos/:idSos", jwt.verify, SosController.update);
routes.delete("/users/:id/sos/:idSos", jwt.verify, SosController.remove);

routes.post("/users/:id/sos/:idSos/evaluations", jwt.verify, EvaluationController.store);
routes.get("/users/:id/sos/:idSos/evaluations", jwt.verify, EvaluationController.list);

routes.post("/users/:id/sos/:idSos/budgets", jwt.verify, BudgetController.store);
routes.get("/users/:id/sos/:idSos/budgets", jwt.verify, BudgetController.list);
routes.get("/users/:id/sos/:idSos/budgets/:idBudget", jwt.verify, BudgetController.index);
routes.put("/users/:id/sos/:idSos/budgets/:idBudget", jwt.verify, BudgetController.update);
routes.delete("/users/:id/sos/:idSos/budgets/:idBudget", jwt.verify, BudgetController.remove);

routes.post("/mechanicals", MechanicalController.store);
routes.get("/mechanicals", jwt.verify, MechanicalController.list);
routes.get("/mechanicals/:id", jwt.verify, MechanicalController.index);
routes.put("/mechanicals/:id", jwt.verify, MechanicalController.update);

module.exports = routes;
