const express = require("express");
const router = express.Router();

const getAllOrdersController = require("../controllers/orders/getAllOrders");
const postOrderController = require("../controllers/orders/postOrder");
const getOrderController = require("../controllers/orders/getOrder");
const deleteOrderController = require("../controllers/orders/deleteOrder");

router.get("/", getAllOrdersController);
router.post("/", postOrderController);
router.get("/:id_order", getOrderController);
router.delete("/", deleteOrderController);

module.exports = router;
