const cors = require("cors");
// Set up a whitelist and check against it:
var whitelist = [
  "http://touchnet.in",
  "http://localhost:3000",
  "http://localhost:5000"
];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

module.exports = function(app) {
  app.use(cors(corsOptions));
};
