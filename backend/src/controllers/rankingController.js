import Ranking from "../models/Ranking";

export const newRanking = async (req, res) => {
  try {
    const ranking = new Ranking(req.body);
    console.log(req.body);
    await ranking.save();
    res.json(ranking);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

export const getRanking = async (req, res) => {
  try {
    const ranking = await Ranking.find().sort({ score: -1 }).limit(10);
    res.json(ranking);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
