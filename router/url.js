import express from "express";
import {
    handleGenerateNewShortURL,
    handleGetAnalytics,
} from "../controllers/shortUrl.js";
import short_url_trackers from "../models/shortUrlTracker.js";


const router = express.Router();

router.post("/create", handleGenerateNewShortURL);
router.get("/analytics/:userId", handleGetAnalytics);
router.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await short_url_trackers.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: new Date(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

export default router;
