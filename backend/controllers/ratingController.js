 
const Rating = require("../models/Rating");

exports.addRating = async (req, res) => {
  try {
    const { storeId, value } = req.body;
    const userId = req.user.id;

    // check if already rated
    let rating = await Rating.findOne({ where: { StoreId: storeId, UserId: userId } });

    if (rating) {
      rating.value = value;
      await rating.save();
    } else {
      rating = await Rating.create({ StoreId: storeId, UserId: userId, value });
    }

    res.json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
