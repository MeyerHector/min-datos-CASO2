import { index } from "../models/locality.model.js";

export const indexLocalities = async (req, res) => {
  try {
    const localitites = await index();
    return res.json(localitites);
  } catch (error) {
    console.log('indexLocalities');
    console.log(error);
  }
};
