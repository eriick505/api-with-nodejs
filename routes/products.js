const express = require("express");
const router = express.Router();
const multer = require("multer");
const login = require("../middleware/login");

const getAllProductsController = require("../controllers/products/getAllProducts");
const postProductController = require("../controllers/products/postProduct");
const getProductController = require("../controllers/products/getProduct");
const updateProductController = require("../controllers/products/updateProduct");
const deleteProductController = require("../controllers/products/deleteProduct");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    const data = new Date().toISOString().replace(/:/g, "-") + "-";
    callback(null, data + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

router.get("/", getAllProductsController);
router.post(
  "/",
  login.required,
  upload.single("product_image"),
  postProductController
);

router.get("/:product_id", getProductController);
router.patch("/", login.required, updateProductController);
router.delete("/", login.required, deleteProductController);

module.exports = router;
