const fs = require("fs");
const axios = require("axios");
const process = require("process");

function cat(path) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.error("error reading file", err);
      process.exit(1);
    }
    console.log("data...", data);
    //console.log(process);
    // console.log(process.argv);
  });
}

async function webCat(url) {
  try {
    let resp = await axios({
      url: url,
      method: "get",
    });
    console.log(resp.data);
  } catch (e) {
    console.log(`Error:${url}`);
    console.log("error:", e.code);
    console.log("404 not found");
    process.exit(1);
  }
}

const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

if (!isValidUrl(process.argv[2])) cat(process.argv[2]);
else {
  webCat(process.argv[2]);
}
console.log("is valid url:", isValidUrl(process.argv[2]));
