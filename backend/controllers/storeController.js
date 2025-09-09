 
const Store = require("../models/Store");
const Rating = require("../models/Rating");

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const store = await Store.create({ name, email, address, UserId: ownerId });
    res.json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStores = async (req, res) => {
  const stores = await Store.findAll({
    include: [{ model: Rating }]
  });

  const formatted = stores.map(store => {
    const ratings = store.Ratings.map(r => r.value);
    const avg = ratings.length ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
    return { ...store.toJSON(), avgRating: avg };
  });

  res.json(formatted);
};
