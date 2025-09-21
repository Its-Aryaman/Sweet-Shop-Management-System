const express = require("express");
const { addSweet, getSweets, searchSweets, updateSweet, deleteSweet } = require("../controllers/sweetController");
const { protect, admin } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, addSweet);
router.get("/", protect, getSweets);
router.get("/search", protect, searchSweets);
router.put("/:id", protect, updateSweet);
router.delete("/:id", protect, admin, deleteSweet); // Admin only

module.exports = router;
