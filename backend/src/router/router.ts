import express from "express";
import userRoutes from "./routes/user";
import petRoutes from "./routes/pet";

const router = express.Router();

// Mount MySQL routes
router.use("/users", userRoutes);

// Mount MongoDB routes
router.use("/pets", petRoutes);

export default router;