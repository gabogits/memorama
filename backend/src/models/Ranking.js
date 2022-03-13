import { Schema, model } from "mongoose";

const RankingSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  score: {
    type: Number,
    require: true,
    default: 0,
  },
  time: {
    type: String,
    require: true,
    default: 0,
  },
  avatar: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Ranking", RankingSchema);
