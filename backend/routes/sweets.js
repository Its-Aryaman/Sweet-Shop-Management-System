import express from "express";
import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweetsController.js";

import { authMiddleware, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", addSweet);
router.get("/", authMiddleware, getSweets);
router.get("/search", authMiddleware, searchSweets);
router.put("/:id", authMiddleware, updateSweet);
router.delete("/:id", authMiddleware, admin, deleteSweet);
router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/:id/restock", authMiddleware, admin, restockSweet);

export default router;
