const path = require("path");

require("source-map-support").install();

//absolute path to the entire root of the project
global.appRoot = path.resolve(__dirname);

//bootstrap entire server application
require("./build/server");