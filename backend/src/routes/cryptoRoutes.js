import express from "express";
import {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
} from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/", getAllCryptos);
router.get("/gainers", getTopGainers);
router.get("/new", getNewListings);
router.post("/", addCrypto);

export default router;