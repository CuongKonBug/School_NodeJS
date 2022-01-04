const path = require("path");
const rootPath = path.normalize(__dirname + "/..");
const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    root: rootPath,
    app: {
      name: "school",
    },
    port: process.env.PORT || 3000,
    db: "mongodb+srv://admin:admin@cluster0.nxcyn.mongodb.net/school_web?retryWrites=true&w=majority",
  },

  test: {
    root: rootPath,
    app: {
      name: "school",
    },
    port: process.env.PORT || 3000,
    db: "mongodb://localhost:27017/TungWeb",
  },

  production: {
    root: rootPath,
    app: {
      name: "school",
    },
    port: process.env.PORT || 3000,
    db: "mongodb+srv://admin:admin@cluster0.nxcyn.mongodb.net/school_web?retryWrites=true&w=majority",
  },
};

module.exports = config[env];
