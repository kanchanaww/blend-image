let request = require("request");
let argv = require("minimist")(process.argv.slice(2));
let blend = require("@mapbox/blend");
let { writeFile } = require("fs");
let { join } = require("path");

const generateImage = async (firstReq) => {
  request.get(firstReq, (err, res, body) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Received response with status:" + res.statusCode);
    return body;
  });
};

const blendImage = async (firstBody, secondBody) => {
  blend(
    [
      { buffer: new Buffer(firstBody, "binary"), x: 0, y: 0 },
      { buffer: new Buffer(secondBody, "binary"), x: width, y: 0 },
    ],
    { width: width * 2, height: height, format: "jpeg" },
    (err, data) => {
      const fileOut = join(process.cwd(), `/cat-card.jpg`);

      writeFile(fileOut, data, "binary", (err) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("The file was saved!");
      });
    }
  );
};

const getImage = async () => {
  try {
    let {
      greeting = "Hello",
      who = "You",
      width = 400,
      height = 500,
      color = "Pink",
      size = 100,
    } = argv;

    let firstReq = {
      // https://cataas.com/cat/says/Hi%20There?width=500&amp;height=800&amp;c=Cyan&amp;s=150
      url:
        "https://cataas.com/cat/says/" +
        greeting +
        "?width=" +
        width +
        "&height=" +
        height +
        "&color" +
        color +
        "&s=" +
        size,
      encoding: "binary",
    };

    let secondReq = {
      url:
        "https://cataas.com/cat/says/" +
        who +
        "?width=" +
        width +
        "&height=" +
        height +
        "&color" +
        color +
        "&s=" +
        size,
      encoding: "binary",
    };

    const [firstBody, secondBody] = await Promise.all([
      generateImage(firstReq),
      generateImage(secondReq),
    ]);
    await blendImage(firstBody, secondBody);
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getImage,
};
