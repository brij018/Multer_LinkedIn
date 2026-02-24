import express from "express";
import upload from "../middleware/uploads.js";
import profileController from "../controller/profileController.js";

const router = express.Router();

router.post(
  "/create-profile",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "introVideo", maxCount: 1 },
    { name: "projectImages", maxCount: 3 },
    { name: "pdf", maxCount: 1 },
  ]),
  profileController.createProfile,
);
router.get("/", profileController.getAllProfiles);
router.get("/:id", profileController.getSingleProfile);
router.delete("/:id", profileController.deleteProfile);

export default router;
