const axios = require("axios");
const blend = require("@mapbox/blend");
const { writeFile } = require("fs");
const { join } = require("path");

const greeting = "Hello";
const who = "You";
const width = 400;
const height = 500;
const color = "Pink";
const size = 100;
const firstReq = `https://cataas.com/cat/says/${greeting}?width=${width}&height=${height}&color${color}&s=${size}`;
const secondReq = `https://cataas.com/cat/says/${who}?width=${width}&height=${height}&color${color}&s=${size}`;
const fileName = "cat-card";

/**
 * Generate Image
 * @param {request} request
 * @returns {Promise<Object>}
 */
const generateImage = async (request) => {
  try {
    const res = await axios.get(request, {
      responseType: "arraybuffer",
      responseEncoding: "binary",
    });
    return res.data;
  } catch (error) {
    throw new Error("Image Generating Error", error);
  }
};

/**
 * Blend Image and Write File
 * @param {firstBody} firstBody
 * @param {secondBody} secondBody
 */
const blendImage = async (firstBody, secondBody) => {
  blend(
    [
      { buffer: new Buffer(firstBody, "binary"), x: 0, y: 0 },
      { buffer: new Buffer(secondBody, "binary"), x: width, y: 0 },
    ],
    { width: width * 2, height: height, format: "jpeg" },
    (err, data) => {
      try {
        const fileOut = join(process.cwd(), `/${fileName}.jpg`);

        writeFile(fileOut, data, "binary", (err) => {
          if (err) {
            throw new Error("File write Error", error);
          }
          console.log("The file was saved!");
        });
      } catch (error) {
        throw new Error("Image Blend Error", error);
      }
    }
  );
};

/**
 * Get Image
 */
const getImage = async () => {
  try {
    const [firstBody, secondBody] = await Promise.all([
      generateImage(firstReq),
      generateImage(secondReq),
    ]);
    await blendImage(firstBody, secondBody);
  } catch (error) {
    throw new Error("Get Images or Call Imgae Blend Error", error);
  }
};

module.exports = {
  getImage,
};
