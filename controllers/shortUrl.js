import { nanoid } from "nanoid";

import short_url_trackers from "../models/shortUrlTracker.js";

export const handleCreateShortUrl = async ({ url, uid, userId }) => {
  const shortID = nanoid(5);
  const result = await short_url_trackers.findOne({ redirectURL: url });
  if (result) return "https://ulai.link/" + result.shortId;
  await short_url_trackers.create({
    shortId: shortID,
    uid: uid,
    userId: userId,
    shortenSource: "ui-generation-flow",
    redirectURL: url,
    visitHistory: [],
  });
  return "https://ulai.link/" + shortID;
};
export const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const newUrl = await handleCreateShortUrl({
    url: body.url,
    uid: body.uid,
    userId: body.userId,
  });
  return res.json({ shortURL: newUrl });
};
export const handleGetAnalytics = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: "UserId is required" });
  const result = await short_url_trackers.find({ userId: userId });
  if (result.length <= 0) {
    return res.json({
      success: true,
      data: [],
      msg: "No Url Shortend !!",
    });
  } else {
    return res.json({
      success: true,
      data: result.map((itm) => ({
        userId: itm.userId,
        shortId: itm.shortId,
        uid: itm.uid,
        redirectURL: itm.redirectURL,
        visitHistory: itm.visitHistory,
      })),
    });
  }
};
