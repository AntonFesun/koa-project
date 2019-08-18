module.exports = {
    port: 3003,
    databaseUrl: 'mongodb://localhost:27017/test',
    crypto: {
      hash: {
          length: 100,
          iterations: 1000
      }
    },

    jwtSecret: 'asdadwebbvXc3o7F%v'
};