const fs = require("fs");
const process = require("process");

function cat(path) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.error("error reading file", err);
      process.exit(1);
    }
    console.log("data...", data);
    //console.log(process);
    console.log(process.argv);
  });
}

//argv[0] is node, [1] is path to step1.js, [2] is first arg

cat(process.argv[2]);
