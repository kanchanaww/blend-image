const imageProcess = require("../services/image-process-service");

async function getImage(req, res, next) {
  try {
    res.json(await imageProcess.getImage());
  } catch (err) {
    console.error(`Error while getting image`, err.message);
    next(err);
  }
}
module.exports = {
  getImage,
};
