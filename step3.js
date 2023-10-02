const fs = require("fs");
const axios = require("axios");
const process = require("process");
let value;

function cat(path, out) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.error("error reading file", err);
      process.exit(1);
    }
    handleOut(data, out);
    //console.log(process);
    // console.log(process.argv);
  });
}

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOut(resp.data, out);
  } catch (e) {
    console.log(`Error:${url}`);
    console.log("error:", e.code);
    console.log("404 not found");
    process.exit(1);
  }
}

function handleOut(value, out) {
  if (out) {
    fs.writeFile(out, value, "utf8", function (err) {
      if (err) {
        console.log("Error writing", out, err);
        process.exit(1);
      } else {
        console.log(value);
      }
    });
  } else {
    console.log(value);
  }
}

const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};
if (process.argv[2] === "--out") {
  toBeWritten = process.argv[3];
  //argv[4] is the path in this case because we are going to read the file and take the value from it
  if (!isValidUrl(process.argv[4])) cat(process.argv[4], toBeWritten);
  else {
    webCat(process.argv[4], toBeWritten);
  }
} else {
  console.log(process.argv[2]);
  if (!isValidUrl(process.argv[2])) cat(process.argv[2], null);
  else {
    webCat(process.argv[2], null);
  }
}
