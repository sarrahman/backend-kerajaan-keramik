import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProduct,
} from "../controllers/products.mjs";
import { getUsers, createUser, loginUser } from "../controllers/users.mjs";
import { constShipingEstimation } from "../controllers/ongkir.mjs";
import express from "express";

const router = express.Router();

router.get("/api/v1/products", getProducts);
router.post("/api/v1/product", addProduct);
router.get("/api/v1/product/:id", getProductById);
router.patch("/api/v1/product/:id", updateProduct);
router.delete("/api/v1/product/:id", deleteProduct);
router.get("/api/v1/products/:nama", searchProduct);

// users routes
router.get("/api/v1/users", getUsers);
router.post("/api/auth/register", createUser);
router.post("/api/auth/login", loginUser);

// ongkir routes
router.post("/api/v1/ongkir", constShipingEstimation);

export default router;
