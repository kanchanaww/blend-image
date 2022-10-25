const imageProcess = require("../services/image-process-service");

async function getImage(req, res, next) {
  try {
    res.json(await imageProcess.getImage());
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getImage,
};
