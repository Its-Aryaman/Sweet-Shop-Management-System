// import express from "express";
// import {
//   addSweet,
//   getSweets,
//   searchSweets,
//   updateSweet,
//   deleteSweet,
//   purchaseSweet,
//   restockSweet,
// } from "../controllers/sweetsController.js";

// import { authMiddleware, admin } from "../middleware/auth.js";

// const router = express.Router();

// router.post("/", addSweet);
// router.get("/", authMiddleware, getSweets);
// router.get("/search", authMiddleware, searchSweets);
// router.put("/:id", authMiddleware, updateSweet);
// router.delete("/:id", authMiddleware, admin, deleteSweet);
// router.post("/:id/purchase", authMiddleware, purchaseSweet);
// router.post("/:id/restock", authMiddleware, admin, restockSweet);

// export default router;



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

/**
 * @swagger
 * /api/sweets:
 *   post:
 *     summary: Add a new sweet
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the sweet
 *                 example: "Chocolate Bar"
 *               category:
 *                 type: string
 *                 description: Category of the sweet
 *                 example: "Chocolate"
 *               price:
 *                 type: number
 *                 description: Price of the sweet
 *                 example: 2.99
 *               quantity:
 *                 type: number
 *                 description: Stock quantity
 *                 example: 100
 *     responses:
 *       201:
 *         description: Sweet added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: number
 *       400:
 *         description: Sweet with this name already exists or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sweet with this name already exists"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token, authorization denied"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.post("/", authMiddleware, addSweet);

/**
 * @swagger
 * /api/sweets:
 *   get:
 *     summary: Get all sweets
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sweets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token, authorization denied"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.get("/", authMiddleware, getSweets);

/**
 * @swagger
 * /api/sweets/search:
 *   get:
 *     summary: Search sweets by name
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Partial sweet name (case-insensitive)
 *         required: false
 *         schema:
 *           type: string
 *           example: "choco"
 *     responses:
 *       200:
 *         description: List of matching sweets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token, authorization denied"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.get("/search", authMiddleware, searchSweets);

/**
 * @swagger
 * /api/sweets/{id}:
 *   put:
 *     summary: Update a sweet
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Sweet ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dark Chocolate Bar"
 *               category:
 *                 type: string
 *                 example: "Chocolate"
 *               price:
 *                 type: number
 *                 example: 3.49
 *               quantity:
 *                 type: number
 *                 example: 80
 *     responses:
 *       200:
 *         description: Sweet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: number
 *       400:
 *         description: Sweet with this name already exists or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sweet with this name already exists"
 *       404:
 *         description: Sweet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sweet not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token, authorization denied"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.put("/:id", authMiddleware, updateSweet);

/**
 * @swagger
 * /api/sweets/{id}:
 *   delete:
 *     summary: Delete a sweet (admin only)
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Sweet ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sweet deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sweet deleted"
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin access required"
 *       404:
 *         description: Sweet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sweet not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token, authorization denied"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.delete("/:id", authMiddleware, admin, deleteSweet);

/**
 * @swagger
 * /api/sweets/{id}/purchase:
 *   post:
 *     summary: Purchase a sweet
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Sweet ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: Quantity to purchase
 *                 example: 5
 *     responses:
 *       200:
 *         description: Sweet purchased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: number
 *       400:
 *         description: Invalid quantity or insufficient stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please enter a valid purchase quantity"
 *       404:
 *         description: Sweet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sweet not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token, authorization denied"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.post("/:id/purchase", authMiddleware, purchaseSweet);

/**
 * @swagger
 * /api/sweets/{id}/restock:
 *   post:
 *     summary: Restock a sweet (admin only)
 *     tags: [Sweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Sweet ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: Quantity to restock
 *                 example: 10
 *     responses:
 *       200:
 *         description: Sweet restocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: number
 *       400:
 *         description: Invalid quantity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please enter a valid restock quantity"
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin access required"
 *       404:
 *         description: Sweet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sweet not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token, authorization denied"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.post("/:id/restock", authMiddleware, admin, restockSweet);

export default router;