import express from "express";
import {
  handleAddContent,
  handleDeleteContent,
  handleGetContent,
} from "../controllers/content.controller";
import { verifyLogin } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/content", handleAddContent );
router.get("/content", handleGetContent );
router.delete("/delete", handleDeleteContent );
export default router;
