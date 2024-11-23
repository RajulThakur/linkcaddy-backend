import express from "express";
import {
  handleAddContent,
  handleDeleteContent,
  handleGetContent,
} from "../controllers/content.controller";
import { verifyLogin } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/content",verifyLogin, handleAddContent );
router.get("/content", handleGetContent );
router.delete("/delete", verifyLogin, handleDeleteContent );
export default router;
