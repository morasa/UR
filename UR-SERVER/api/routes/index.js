import { Router } from "express";
import * as menu from "../controllers/menus";
import * as role from "../controllers/roles";
import * as user from "../controllers/users";

export const router = Router();

router.route("/api/menus/list")
      .get(menu.list);
router.route("/api/menus/create")
      .post(menu.create);
router.route("/api/menus/delete/:id")
      .delete(menu.deleteById);
router.route("/api/roles/list")
      .get(role.list);
router.route("/api/roles/create")
      .post(role.create);
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
router.route("/login")
      .post(user.login);
      