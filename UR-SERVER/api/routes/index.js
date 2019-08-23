import { Router } from "express";
import * as menu from "../controllers/menus";
import * as role from "../controllers/roles";
import * as user from "../controllers/users";
import * as token from "../middleware/verifyToken";

export const router = Router();
//login
router.route("/login")
      .post(user.login);
//verify token      
router.route("/api/*")
      .get(token.verifyToken);
//menu api routes
router.route("/api/menus/list")
      .get(menu.list);
router.route("/api/menus/create")
      .post(menu.create);
router.route("/api/menus/delete/:id")
      .delete(menu.deleteById);
//roles api routes
router.route("/api/roles/list")
      .get(role.list);
router.route("/api/roles/create")
      .post(role.create); 
//users api routes
router.route("/api/users/:user_code")
      .delete(user.deleteByCode);
router.route("/api/users/list")
      .get(user.list);
router.route("/api/users/create")
      .post(user.create);
router.route("/api/users/:user_code")
      .get(user.findByCode);
router.route("/api/users/:user_code")
      .patch(user.updateByCode);

      