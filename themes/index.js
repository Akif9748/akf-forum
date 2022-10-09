const fs = require("fs");

for (const theme of fs.readdirSync("./themes")) {
    if (theme === "index.js") continue;
    module.exports[theme] = require(`./${theme}`);
}