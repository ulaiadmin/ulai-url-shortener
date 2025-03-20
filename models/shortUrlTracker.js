import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    shortenSource: {
      type: String,
      required: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: String } }],
  },
  { timestamps: true }
);

const short_url_trackers = mongoose.model("short_url_trackers", shortUrlSchema);

export default short_url_trackers;
