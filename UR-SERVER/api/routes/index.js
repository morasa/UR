import { Router } from "express";
import * as menu from "../controllers/menus";
export const router = Router();

router.route("/api/menus/list")
      .get(menu.list);
router.route("/api/menus/create")
      .post(menu.create);