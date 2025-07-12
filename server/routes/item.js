const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Setup Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rewear-items",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// @route POST /api/items/upload
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, size, condition } = req.body;

    const newItem = new Item({
      title,
      description,
      size,
      condition,
      imageUrl: req.file.path,
      uploader: req.user.id
    });

    await newItem.save();
    res.status(201).json({ message: "Item uploaded", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/items/all
router.get("/all", async (req, res) => {
  try {
    const items = await Item.find().populate("uploader", "name");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

module.exports = router;
