const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");
const Item = require("../models/Item");
const SwapRequest = require("../models/SwapRequest");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// 🔧 Setup Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rewear-items",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

/**
 * ========================================
 * ✅ UPLOAD ITEM (Protected)
 * ========================================
 */
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, size, condition } = req.body;

    const newItem = new Item({
      title,
      description,
      size,
      condition,
      imageUrl: req.file.path,
      uploader: req.user.id,
    });

    await newItem.save();
    res.status(201).json({ message: "Item uploaded", item: newItem });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ========================================
 * ✅ GET ALL ITEMS (Public)
 * ========================================
 */
router.get("/all", async (req, res) => {
  try {
    const items = await Item.find().populate("uploader", "name email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

/**
 * ========================================
 * ✅ SEND SWAP REQUEST (Protected)
 * ========================================
 */
router.post("/swap/:itemId", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    if (item.uploader.toString() === req.user.id) {
      return res.status(400).json({ msg: "You can't request your own item" });
    }

    const existing = await SwapRequest.findOne({
      item: item._id,
      requester: req.user.id,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({ msg: "Request already sent for this item" });
    }

    const request = new SwapRequest({
      item: item._id,
      requester: req.user.id,
    });

    await request.save();
    res.json({ msg: "Swap request sent!" });
  } catch (err) {
    console.error("Swap request error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * ========================================
 * ✅ GET INCOMING REQUESTS (Protected)
 * ========================================
 */
router.get("/requests/incoming", auth, async (req, res) => {
  try {
    const requests = await SwapRequest.find({ status: "pending" })
      .populate("item requester", "title name email");

    // Filter only requests for items uploaded by logged-in user
    const userRequests = requests.filter(
      (r) => r.item.uploader.toString() === req.user.id
    );

    res.json(userRequests);
  } catch (err) {
    console.error("Get requests error:", err);
    res.status(500).json({ msg: "Failed to get swap requests" });
  }
});
// @route GET /api/items/my-items
// @desc Get all items uploaded by current user
// @access Private
router.get("/my-items", auth, async (req, res) => {
  try {
    const items = await Item.find({ uploader: req.user.id });
    res.json(items);
  } catch (err) {
    console.error("My Items error:", err);
    res.status(500).json({ message: "Failed to fetch your items" });
  }
});
// @route GET /api/items/my-requests
// @desc Get all swap requests made by current user
// @access Private
router.get("/my-requests", auth, async (req, res) => {
  try {
    const requests = await SwapRequest.find({ requester: req.user.id })
      .populate("item", "title imageUrl uploader")
      .populate("requester", "name");

    res.json(requests);
  } catch (err) {
    console.error("My Requests error:", err);
    res.status(500).json({ message: "Failed to fetch your swap requests" });
  }
});
// @route DELETE /api/items/swap/:id
// @desc Requester cancels their own swap request
// @access Private
router.delete("/swap/:id", auth, async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ msg: "Request not found" });

    if (request.requester.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to cancel this request" });
    }

    await request.deleteOne();
    res.json({ msg: "Swap request cancelled" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// @route GET /api/items/my-swaps
// @desc Return all swap requests related to logged-in user (sent or received)
// @access Private
router.get("/my-swaps", auth, async (req, res) => {
  try {
    const received = await SwapRequest.find()
      .populate("item requester", "title name email imageUrl")
      .where("status").in(["accepted", "completed"]);

    const sent = await SwapRequest.find({ requester: req.user.id })
      .populate("item", "title imageUrl uploader")
      .populate("requester", "name");

    // Filter: either sent by or items owned by user
    const userReceived = received.filter(
      (r) => r.item.uploader.toString() === req.user.id
    );

    res.json({
      sent,
      received: userReceived
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch swap data" });
  }
});

/**
 * ========================================
 * ✅ ACCEPT or REJECT SWAP REQUEST (Protected)
 * ========================================
 */
router.patch("/swap/:id", auth, async (req, res) => {
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  try {
    const request = await SwapRequest.findById(req.params.id).populate("item");
    if (!request) return res.status(404).json({ msg: "Request not found" });

    if (request.item.uploader.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to modify this request" });
    }

    request.status = status;
    await request.save();

    res.json({ msg: `Request ${status}` });
  } catch (err) {
    console.error("Update request error:", err);
    res.status(500).json({ msg: "Failed to update request" });
  }
});

module.exports = router;
