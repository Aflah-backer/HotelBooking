import express from "express";
import {
  createdRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updatedRoom,
  updatedRoomAvailabilty,
} from "../controllers/room.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is rooms");
});

//CREATE
router.post("/:hotelId", verifyAdmin, createdRoom);

//UPDATE
router.put("/:id", verifyAdmin, updatedRoom);

router.put("/availability/:id", updatedRoomAvailabilty);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

export default router;
